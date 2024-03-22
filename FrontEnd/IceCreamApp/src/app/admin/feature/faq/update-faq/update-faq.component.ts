import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-update-faq',
  templateUrl: './update-faq.component.html',
  styleUrls: ['./update-faq.component.css']
})
export class UpdateFaqComponent {
  faX = faX;
  faqForm: FormGroup;
  faq: Faq;

  constructor(
    public dialogRef: MatDialogRef<UpdateFaqComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Faq,
    private fb: FormBuilder,
    private faqService: FaqService,
    private messageService: MessageService
  ) {
    this.faq = data;

    this.faqForm = this.fb.group({
      question: [data.question, Validators.required],
      answer: [data.answer, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.faqForm.valid) {
      const updateFaq: Faq = this.faqForm.value;

      this.faqService.updateFaq(this.faq.id, updateFaq).subscribe(() => {
        this.dialogRef.close(updateFaq);
        this.messageService.openSuccess('Faq updated successfully');
      }, (error) => {
        this.messageService.openError('Failed to update faq. Please try again later');
        console.error('Error while creating faq:', error);
      });
    }
  }
}
