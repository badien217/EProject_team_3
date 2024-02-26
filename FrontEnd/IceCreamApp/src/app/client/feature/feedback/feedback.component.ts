import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  faUser = faUser;

  feedback: Feedback = {
    name: '',
    email: '',
    phone: '',
    feedbackContent: '',
    feedbackDate: new Date(),
  };
  submitted = false;
  feedbacks: Feedback[] = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(){
    this.feedbackService.getAllFeedbacks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Feedback[]) => {
        this.feedbacks = data;
        console.log(this.feedbacks);
      }
    );

  }

  saveFeedback(): void {
    const data = {
      name: this.feedback.name,
      email: this.feedback.email,
      phone: this.feedback.phone,
      feedbackContent: this.feedback.feedbackContent,
      feedbackDate: this.feedback.feedbackDate,
    };

    this.feedbackService.createFeedback(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newFeedback(): void {
    this.submitted = false;
    this.feedback = {
      name: '',
      email: '',
      phone: '',
      feedbackContent: '',
      feedbackDate: new Date(),
    };
  }

  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
