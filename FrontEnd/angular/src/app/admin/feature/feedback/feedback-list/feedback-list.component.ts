import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FeedbackService } from '../../../../services/feedback.service';
import { Feedback } from '../../../../interfaces/feedback';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrl: './feedback-list.component.css'
})
export class FeedbackListComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  feedbacks: Feedback[] = [];
  page: number = 1;
  
  currentFeedback: Feedback = {};
  currentIndex = -1;
  title = '';

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.retrieveFeedbacks();
  }

  retrieveFeedbacks(): void {
    this.feedbackService.getAllFeedbacks().subscribe({
      next: (data) => {
        this.feedbacks = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}

