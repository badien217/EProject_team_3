import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  faUser = faUser;
  feedbacks: Feedback[] = [];
  feedbackForm: FormGroup;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private feedbackService: FeedbackService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      feedbackContent: ['', Validators.required],
      feedbackDate: [new Date()]
    });
  }

  ngOnInit() {
    this.retrieveFeedbacks();
  }

  retrieveFeedbacks() {
    this.feedbackService.getAllFeedbacks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
      }
    );
  }

  saveFeedback(): void {
    if (this.feedbackForm.valid) {
      const data = this.feedbackForm.value

      this.feedbackService.createFeedback(data).subscribe({
        next: (res) => {
          this.retrieveFeedbacks();
          this.messageService.openSuccess('Feedback sent successfully');

          this.feedbackForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            feedbackContent: ['', Validators.required],
            feedbackDate: [new Date()]
          });
        },
        error: (e) => {
          this.messageService.openError('Feedback send error. Please try again');
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
