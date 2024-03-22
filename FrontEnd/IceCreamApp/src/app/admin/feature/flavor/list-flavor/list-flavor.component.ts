import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Flavor } from 'src/app/interfaces/flavor';
import { FlavorService } from 'src/app/services/flavor.service';
import { AddFlavorComponent } from '../add-flavor/add-flavor.component';
import { UpdateFlavorComponent } from '../update-flavor/update-flavor.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-flavor',
  templateUrl: './list-flavor.component.html',
  styleUrls: ['./list-flavor.component.css']
})
export class ListFlavorComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Flavor> = new MatTableDataSource<Flavor>();
  displayedColumns: string[] = ['index', 'name', 'imageUrl', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(private flavorService: FlavorService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.retrieveFlavors();
  }

  retrieveFlavors(): void {
    this.flavorService.getAllFlavors().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Flavor>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => this.messageService.openError('Flavor data retrieval error')
    });
  }

  getIndex(row: Flavor): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }


  openAddFlavorDialog(): void {
    const dialogRef = this.dialog.open(AddFlavorComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveFlavors();
    });
  }

  openUpdateFlavorDialog(flavor: Flavor): void {
    const dialogRef = this.dialog.open(UpdateFlavorComponent, {
      data: {
        id: flavor.id,
        name: flavor.name,
        imageUrl: flavor.imageUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveFlavors();
    });
  }

  deleteFlavor(flavorId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this flavor? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.flavorService.deleteFlavor(flavorId).subscribe(() => {
          this.retrieveFlavors();

          this.messageService.openSuccess('Flavor deleted successfully');
        }, (error) => {
          this.messageService.openError('Failed to delete flavor. Please try again');
        });
      }
    });
  }
}
