import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { UpdateFeedbackComponent } from '../update-feedback/update-feedback.component';
import { AddFeedbackComponent } from '../add-feedback/add-feedback.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Feedback> = new MatTableDataSource<Feedback>();
  displayedColumns: string[] = ['index', 'name', 'email', 'phone', 'feedbackContent', 'feedbackDate', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(private feedbackService: FeedbackService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveFeedbacks();
  }

  retrieveFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Feedback>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.dataSource)
      },
      error: (e) => console.error(e),
    });
  }

  getIndex(row: Feedback): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }


  openAddFeedbackDialog(): void {
    const dialogRef = this.dialog.open(AddFeedbackComponent, {
      data: { name: '', email: '', phone: '', feedbackContent: '', feedbackDate: Date.now }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.createFeedback(result).subscribe(() => {
          this.retrieveFeedbacks();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Feedback created successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while creating feedback:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to create feedback. Please try again later' },
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


  openUpdateFeedbackDialog(feedback: Feedback): void {
    const dialogRef = this.dialog.open(UpdateFeedbackComponent, {
      data: {
        name: feedback.name,
        email: feedback.email,
        phone: feedback.phone,
        feedbackContent: feedback.feedbackContent,
        feedbackDate: feedback.feedbackDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.feedbackService.updateFeedback(feedback.id, result).subscribe(() => {
          this.retrieveFeedbacks();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Feedback updated successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while updating feedback:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to update feedback. Please try again later' },
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

  deleteFeedback(feedbackId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this feedback? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.feedbackService.deleteFeedback(feedbackId).subscribe(() => {
          this.retrieveFeedbacks();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Feedback deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while deleting feedback:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to delete feedback. Please try again later' },
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
