import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-success-snackbar',
  templateUrl: './success-snackbar.component.html',
  styleUrls: ['./success-snackbar.component.css']
})
export class SuccessSnackbarComponent {
  faX = faX;

  constructor(
    public snackBarRef: MatSnackBarRef<SuccessSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  dismissWithAction(): void {
    this.snackBarRef.dismissWithAction();
  }
}
