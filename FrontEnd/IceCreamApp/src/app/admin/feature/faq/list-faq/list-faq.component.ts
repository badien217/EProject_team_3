import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';
import { AddFaqComponent } from '../add-faq/add-faq.component';
import { UpdateFaqComponent } from '../update-faq/update-faq.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css']
})
export class ListFaqComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Faq> = new MatTableDataSource<Faq>();
  displayedColumns: string[] = ['index', 'question', 'answer', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(private faqService: FaqService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.retrieveFaqs();
  }

  retrieveFaqs(): void {
    this.faqService.getAllFaqs().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Faq>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (e) => this.messageService.openError('FAQs data retrieval error')
    });
  }

  getIndex(row: Faq): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddFaqDialog(): void {
    const dialogRef = this.dialog.open(AddFaqComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveFaqs();
    });
  }


  openUpdateFaqDialog(faq: Faq): void {
    const dialogRef = this.dialog.open(UpdateFaqComponent, {
      data: {
        id: faq.id,
        question: faq.question,
        answer: faq.answer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveFaqs();
    });
  }

  deleteFaq(faqId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this faq? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.faqService.deleteFaq(faqId).subscribe(() => {
          this.retrieveFaqs();

          this.messageService.openSuccess('Faq deleted successfully');
        }, (error) => {
          // Log the error here
          console.error('Error while deleting faq:', error);

          this.messageService.openError('Failed to delete faq. Please try again later');
        });
      }
    });
  }

}