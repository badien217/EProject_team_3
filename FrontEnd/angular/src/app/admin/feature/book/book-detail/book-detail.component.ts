import { Component, Input, OnInit } from '@angular/core';
import { faStar, faStarHalfStroke, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { BookService } from '../../../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../../../interfaces/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit{
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faCartShopping = faCartShopping;

  @Input() viewMode = false;

  @Input() currentBook: Book = {
    title: '',
    description: '',
    publishedDate: new Date(),
    author: '',
    imageUrl: '',
    price: 0,
  };

  message = '';

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.viewMode) {
      this.message = '';
      this.getBook(this.route.snapshot.params['id']);
    }
  }

  getBook(id: string): void {
    this.bookService.getBookById(id).subscribe({
      next: (data) => {
        this.currentBook = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  // updatePublished(status: boolean): void {
  //   const data = {
  //     title: this.currentBook.title,
  //     description: this.currentBook.description,
  //     publishedAt: this.currentBook.publishedAt, 
  //     price: this.currentBook.price,
  //     author: this.currentBook.author,
  //     imageUrl: this.currentBook.imageUrl
  //   };

  //   this.message = '';

  //   this.bookService.updateBook(this.currentBook.id, data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.currentBook.publishedAt = this.currentBook.publishedAt;
  //       this.message = res.message
  //         ? res.message
  //         : 'The status was updated successfully!';
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  updateBook(): void {
    this.message = '';

    this.bookService
      .updateBook(this.currentBook.id, this.currentBook)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This book was updated successfully!';
        },
        error: (e) => console.error(e)
      });
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.currentBook.id).subscribe({
      next: (res) => {
        console.log(res);
        // this.router.navigate(['/tutorials']);
      },
      error: (e) => console.error(e)
    });
  }
}
