import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-info-snackbar',
  templateUrl: './info-snackbar.component.html',
  styleUrls: ['./info-snackbar.component.css']
})
export class InfoSnackbarComponent {
  faX = faX;

  constructor(
    public snackBarRef: MatSnackBarRef<InfoSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) { }

  dismissWithAction(): void {
    this.snackBarRef.dismissWithAction();
  }
}
