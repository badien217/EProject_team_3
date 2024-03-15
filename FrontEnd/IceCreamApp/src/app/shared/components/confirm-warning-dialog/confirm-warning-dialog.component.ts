import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-confirm-warning-dialog',
  templateUrl: './confirm-warning-dialog.component.html',
  styleUrls: ['./confirm-warning-dialog.component.css']
})
export class ConfirmWarningDialogComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<ConfirmWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
