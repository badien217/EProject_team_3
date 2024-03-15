import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Flavor } from 'src/app/interfaces/flavor';
import { FlavorService } from 'src/app/services/flavor.service';
import { AddFlavorComponent } from '../add-flavor/add-flavor.component';
import { UpdateFlavorComponent } from '../update-flavor/update-flavor.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

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

  constructor(private flavorService: FlavorService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveFlavors();
  }

  retrieveFlavors(): void {
    this.flavorService.getAllFlavors().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Flavor>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.dataSource)
      },
      error: (e) => console.error(e),
    });
  }

  getIndex(row: Flavor): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }


  openAddFlavorDialog(): void {
    const dialogRef = this.dialog.open(AddFlavorComponent, {
      data: { name: '', email: '', phone: '', flavorContent: '', flavorDate: Date.now }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flavorService.createFlavor(result).subscribe(() => {
          this.retrieveFlavors();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Flavor created successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while creating flavor:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to create flavor. Please try again later' },
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


  openUpdateFlavorDialog(flavor: Flavor): void {
    const dialogRef = this.dialog.open(UpdateFlavorComponent, {
      data: {
        name: flavor.name,
        imageUrl: flavor.imageUrl
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.flavorService.updateFlavor(flavor.id, result).subscribe(() => {
          this.retrieveFlavors();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Flavor updated successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while updating flavor:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to update flavor. Please try again later' },
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

  deleteFlavor(flavorId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this flavor? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.flavorService.deleteFlavor(flavorId).subscribe(() => {
          this.retrieveFlavors();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Flavor deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while deleting flavor:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to delete flavor. Please try again later' },
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
