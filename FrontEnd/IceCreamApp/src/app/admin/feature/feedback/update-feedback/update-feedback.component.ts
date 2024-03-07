import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Feedback } from 'src/app/interfaces/feedback';

@Component({
  selector: 'app-update-feedback',
  templateUrl: './update-feedback.component.html',
  styleUrls: ['./update-feedback.component.css']
})
export class UpdateFeedbackComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<UpdateFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
