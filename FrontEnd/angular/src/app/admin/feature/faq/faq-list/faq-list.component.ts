import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FaqService } from '../../../../services/faq.service';
import { Faq } from '../../../../interfaces/faq';

@Component({
  selector: 'app-faq-list',
  templateUrl: './faq-list.component.html',
  styleUrl: './faq-list.component.css'
})
export class FaqListComponent {

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
