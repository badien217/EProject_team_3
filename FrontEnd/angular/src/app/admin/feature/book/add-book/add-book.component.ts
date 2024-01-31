import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BookService } from '../../../../services/book.service';
import { Book } from '../../../../interfaces/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  faArrowLeft = faArrowLeft

  book: Book = {
    title: '',
    description: '',
    author: '',
    imageUrl: '',
    price: 0,
    publishedDate: new Date(),
  };
  submitted = false;

  constructor(private bookService: BookService) { }

  saveBook(): void {
    const data = {
      title: this.book.title,
      description: this.book.description,
      author: this.book.author,
      imageUrl: this.book.imageUrl,
      price: this.book.price,
      publishedAt: this.book.publishedDate,
    };

    this.bookService.createBook(data).subscribe({
      next: (res) => {
        console.log(res);
        this.submitted = true;
      },
      error: (e) => console.error(e)
    });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      description: '',
      author: '',
      imageUrl: '',
      price: 0,
      publishedDate: new Date(),
    };
  }
}
