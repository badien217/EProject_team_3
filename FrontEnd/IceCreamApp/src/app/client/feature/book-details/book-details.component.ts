import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStar, faStarHalfStroke, faCartShopping, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { BookRating } from 'src/app/interfaces/book-rating';
import { CartDetail } from 'src/app/interfaces/cart-detail';
import { Cart } from 'src/app/interfaces/cart';
import { CartService } from 'src/app/services/cart.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  cardIndexes = Array(4).fill(0).map((_, i) => i);
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faCartShopping = faCartShopping;
  faArrowRight = faArrowRight;
  faStarRegular = faStarRegular;

  book: Book;
  bookId!: number;
  books: Book[] = [];
  bookRatings: BookRating[] = [];
  avgRating: number = 0;
  bookRatingForm: FormGroup;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cartService: CartService,
    private sessionStorageService: SessionStorageService,
    private authService: AuthenticationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.book = <any>{};
    this.books = <any>{};
    this.bookRatingForm = this.fb.group({
      bookId: [0],
      rating: [0, Validators.required],
      name: ['', Validators.required],
      comment: ['', Validators.required],
      ratingDate: [new Date()]
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookId = +params['id'];
      this.retrieveBookDetails();
      this.retrieveBookRating();
      this.retrieveAvgRating();

      this.bookRatingForm = this.fb.group({
        bookId: [this.bookId],
        rating: [0, Validators.required],
        name: ['', Validators.required],
        comment: ['', Validators.required],
        ratingDate: [new Date()]
      })
    });
    this.retrieveAllBooks();
  }

  retrieveBookDetails(): void {
    this.bookService.getBookById(this.bookId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book) => {
        this.book = data;
      }
    );
  }


  retrieveAllBooks(): void {
    this.bookService.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book[]) => {
        this.books = data.slice(0, 8);
        this.fetchAverageRatings();
      }
    );
  }

  retrieveBookRating(): void {
    this.bookService.getBookRatingById(this.bookId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: BookRating[]) => {
        this.bookRatings = data;
      }
    );
  }

  retrieveAvgRating(): void {
    this.bookService.getAvgRating(this.bookId).pipe(takeUntil(this.destroy$)).subscribe(
      data => { this.avgRating = data }
    );
  }

  // Function to generate an array of star icons based on the rating number
  getStarArray(rating: number): any[] {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        starsArray.push({ icon: this.faStar });
      } else {
        starsArray.push({ icon: this.faStarRegular });
      }
    }
    return starsArray;
  }

  createBookRating(): void {
    const data = this.bookRatingForm.value;

    this.bookService.createBookRating(data).subscribe(
      response => {
        this.retrieveBookRating();
        this.retrieveAvgRating();

        this.messageService.openSuccess('Rating successfully');
      },
      error => {
        this.messageService.openError('Error rating. Please check your credentials');
      }
    );
  }

  // Function to generate an array of star icons based on the average rating
  getAvgStarArray(): any[] {
    const avgStarArray = [];
    const fullStars = Math.floor(this.avgRating);
    const halfStar = this.avgRating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        avgStarArray.push({ icon: this.faStar });
      } else if (i === fullStars && halfStar) {
        avgStarArray.push({ icon: this.faStarHalfStroke });
      } else {
        avgStarArray.push({ icon: this.faStarRegular });
      }
    }
    return avgStarArray;
  }


  fetchAverageRatings() {
    this.books.forEach(book => {
      this.bookService.getAvgRating(book.id).subscribe(
        (avgRating: number) => {
          book.averageRating = avgRating;
        },
        error => {
          this.messageService.openError('Book rating data retrieval error')
        }
      );
    });
  }


  addToCart(book: Book): void {
    if (this.isClientLoggedIn) {
      const token = localStorage.getItem('isClientLoggedIn');
      if (token) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.cartService.getLatestCartByUserId(data.userInfo.id).subscribe(
              (cart: Cart) => {
                if (cart) {
                  const existingDetail = cart.cartDetails.find(detail => detail.bookId === book.id);
                  if (existingDetail) {
                    existingDetail.quantity += 1;
                    this.cartService.updateCartDetail(existingDetail.id, existingDetail).subscribe(
                      () => {
                        this.cartService.updateCartDetailTotal(cart.cartDetails.length);
                      },
                      error => {
                        this.messageService.openError('Fail to add book to cart');
                      }
                    );
                  } else {
                    const newCartDetail: CartDetail = {
                      id: 0, // Since it's a new detail, let the server generate the ID
                      cartId: cart.id,
                      bookId: book.id!,
                      quantity: 1,
                    };
                    this.cartService.createCartDetail(newCartDetail).subscribe(
                      () => {
                        this.cartService.updateCartDetailTotal(cart.cartDetails.length + 1);
                      },
                      error => {
                        this.messageService.openError('Fail to add book to cart');
                      }
                    );
                  }
                } else {
                  this.messageService.openError('Fail to add book to cart');
                }
              },
              error => {
                this.messageService.openError('Cart data retrieval error');
              }
            );
          }
        );
      }
    } else {
      // handle add book store session storage

      // Handle add book to session storage as CartDetail
      const storedCartDetailsJson = sessionStorage.getItem('cartDetails');
      let storedCartDetails: CartDetail[] = storedCartDetailsJson ? JSON.parse(storedCartDetailsJson) : [];

      const existingDetailIndex = storedCartDetails.findIndex(detail => detail.bookId === book.id);

      if (existingDetailIndex !== -1) {
        // Detail is already in session storage, update quantity
        storedCartDetails[existingDetailIndex].quantity += 1;
      } else {
        // Detail is not in session storage, add it
        const newCartDetail: CartDetail = {
          id: 0, // Since it's a new detail, let the server generate the ID
          cartId: 0, // Set to 0 or another default value as it's not associated with a cart yet
          bookId: book.id!,
          quantity: 1,
        };
        storedCartDetails.push(newCartDetail);
      }

      // Save updated details back to session storage
      // sessionStorage.setItem('cartDetails', JSON.stringify(storedCartDetails));
      this.sessionStorageService.set('cartDetails', storedCartDetails);
    }
  }


  getAvgStarIconArray(avgRating: number): any[] {
    const avgStarArray = [];
    const fullStars = Math.floor(avgRating);
    const halfStar = avgRating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        avgStarArray.push({ icon: this.faStar });
      } else if (i === fullStars && halfStar) {
        avgStarArray.push({ icon: this.faStarHalfStroke });
      } else {
        avgStarArray.push({ icon: this.faStarRegular });
      }
    }
    return avgStarArray;
  }

  // Function to check if a book is new (published within the last month)
  isNew(publishedDate: Date): boolean {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1); // Subtract one month
    const bookDate = new Date(publishedDate);
    return bookDate >= oneMonthAgo;
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
