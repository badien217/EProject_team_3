import { Component } from '@angular/core';
import {  faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  books: Book[] = [];
  page: number = 1;
  
  currentBook: Book = {};
  currentIndex = -1;
  title = '';

  constructor(private bookService: BookService) {}

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
