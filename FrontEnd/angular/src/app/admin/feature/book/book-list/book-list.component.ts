import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../../../interfaces/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  books: Book[] = [];
  page: number = 1;

  currentBook: Book = {};
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  setActiveBook(book: Book, index: number): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

}
