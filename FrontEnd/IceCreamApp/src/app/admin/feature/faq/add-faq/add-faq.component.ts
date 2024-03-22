import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent {
  faX = faX;
  faqForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddFaqComponent>,
    private fb: FormBuilder,
    private faqService: FaqService,
    private messageService: MessageService
  ) {
    this.faqForm = this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.faqForm.valid) {
      const newFaq: Faq = this.faqForm.value;

      this.faqService.createFaq(newFaq).subscribe(() => {
        this.dialogRef.close(newFaq);
        this.messageService.openSuccess('Faq created successfully');
      }, (error) => {
        this.messageService.openError('Fail to create faq. Please try again later');
        console.log(error);
      });
    }
  }
}
