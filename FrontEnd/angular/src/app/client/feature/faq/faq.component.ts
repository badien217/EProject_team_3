import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Faq } from '../../../interfaces/faq';
import { FaqService } from '../../../services/faq.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  animations: [
    trigger('fadeInOut', [
      state('open', style({
        opacity: 1,
        height: '*',
      })),
      state('closed', style({
        opacity: 0,
        height: '0',
      })),
      transition('open <=> closed', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class FaqComponent {

  faAngleDown=faAngleDown;
  faAngleUp=faAngleUp;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  faqs: Faq[] = [];
  page: number = 1;

  constructor(
    private faqService: FaqService
  ) { }

  ngOnInit() {
    this.faqService.getAllFaqs().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Faq[]) => {
        this.faqs = data;

          // Set the isFaqOpen property of the first FAQ to true
          if (this.faqs.length > 0) {
            this.faqs[0].isFaqOpen = true;
          }
          
        console.log(this.faqs);
      }
    );
  }
  
  toggleFaq(faq: Faq): void {
    faq.isFaqOpen = !faq.isFaqOpen;
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}



