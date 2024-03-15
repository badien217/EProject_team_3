import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';
import { AddFaqComponent } from '../add-faq/add-faq.component';
import { UpdateFaqComponent } from '../update-faq/update-faq.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

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

  constructor(private faqService: FaqService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

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
      error: (e) => console.error(e),
    });
  }

  getIndex(row: Faq): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddFaqDialog(): void {
    const dialogRef = this.dialog.open(AddFaqComponent, {
      data: { question: '', answer: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.faqService.createFaq(result).subscribe(() => {
          this.retrieveFaqs();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Faq created successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while creating faq:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to create faq. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });

        console.log('result', result);
      }
    });
  }


  openUpdateFaqDialog(faq: Faq): void {
    const dialogRef = this.dialog.open(UpdateFaqComponent, {
      data: {
        question: faq.question,
        answer: faq.answer
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.faqService.updateFaq(faq.id, result).subscribe(() => {
          this.retrieveFaqs();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Faq updated successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while updating faq:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to update faq. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });

        console.log('result', result);
      }
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

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Faq deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while deleting faq:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to delete faq. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });
      }
    });
  }

}