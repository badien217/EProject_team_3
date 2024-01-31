import { Component, OnDestroy, OnInit } from '@angular/core';
import { faStar, faStarHalfStroke, faCartShopping, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { Book } from '../../../interfaces/book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit, OnDestroy{
  cardIndexes = Array(4).fill(0).map((_, i) => i);
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faCartShopping = faCartShopping;
  faArrowRight = faArrowRight;

  book: Book;
  bookId!: number;
  books: Book[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService
  ) {
    this.book = <any>{};
    this.books = <any>{};
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.params['id'];
    this.bookService.getBookById(this.bookId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book) => {
        this.book = data;
        console.log(this.book);
      }
    );
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
