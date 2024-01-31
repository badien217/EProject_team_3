import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfStroke, faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit  {
  faStar = faStar;
  faStarHalfStroke=faStarHalfStroke;
  faCartShopping=faCartShopping;

  
  private destroy$: Subject<boolean> = new Subject<boolean>();
  books: Book[] = [];
  page: number = 1;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit() {
    this.bookService.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book[]) => {
        this.books = data;
        console.log(this.books);
      }
    );
  } 
  
  
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
