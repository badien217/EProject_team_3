import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<AddFaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Faq
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
