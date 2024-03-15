import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css']
})
export class AddFeedbackComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<AddFeedbackComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
