import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-warning-snackbar',
  templateUrl: './warning-snackbar.component.html',
  styleUrls: ['./warning-snackbar.component.css']
})
export class WarningSnackbarComponent {
  faX = faX;

  constructor(
    public snackBarRef: MatSnackBarRef<WarningSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  dismissWithAction(): void {
    this.snackBarRef.dismissWithAction();
  }
}
