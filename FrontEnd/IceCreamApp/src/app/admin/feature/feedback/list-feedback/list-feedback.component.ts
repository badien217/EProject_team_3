import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Feedback } from 'src/app/interfaces/feedback';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-list-feedback',
  templateUrl: './list-feedback.component.html',
  styleUrls: ['./list-feedback.component.css']
})
export class ListFeedbackComponent {
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
