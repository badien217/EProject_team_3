import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';

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

  constructor(
    private feedbackService: FeedbackService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.retrieveFeedbacks();
  }

  retrieveFeedbacks() {
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
        this.newFeedback();
        this.retrieveFeedbacks();

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Feedback sent successfully!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      error: (e) => {
        console.error(e);

        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Feedback send error. Please try again!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
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
