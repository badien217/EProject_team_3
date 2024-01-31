import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Faq } from 'src/app/interfaces/faq';
import { FaqService } from 'src/app/services/faq.service';

@Component({
  selector: 'app-list-faq',
  templateUrl: './list-faq.component.html',
  styleUrls: ['./list-faq.component.css']
})
export class ListFaqComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  faqs: Faq[] = [];
  page: number = 1;
  
  currentFaq: Faq = {};
  currentIndex = -1;
  title = '';

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.retrieveFaqs();
  }

  retrieveFaqs(): void {
    this.faqService.getAllFaqs().subscribe({
      next: (data) => {
        this.faqs = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
