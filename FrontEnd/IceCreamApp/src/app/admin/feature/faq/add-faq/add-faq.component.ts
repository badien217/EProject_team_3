import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-add-faq',
  templateUrl: './add-faq.component.html',
  styleUrls: ['./add-faq.component.css']
})
export class AddFaqComponent {
  faArrowLeft = faArrowLeft;

  faq: Faq = {
    question: '',
    answer: '',
  };
  submitted = false;

  constructor(private faqService: FaqService) { }

  saveFaq(): void {
    const data = {
      question: this.faq.question,
      answer: this.faq.answer,
    };

    this.faqService.createFaq(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newFaq(): void {
    this.submitted = false;
    this.faq = {
      question: '',
    answer: '',
    };
  }
}
