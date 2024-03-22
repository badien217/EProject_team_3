import { Component, EventEmitter, OnInit } from '@angular/core';
import { faStar, faStarHalfStroke, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { CartDetail } from 'src/app/interfaces/cart-detail';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faCartShopping = faCartShopping;
  faStarRegular = faStarRegular;

  private destroy$: Subject<boolean> = new Subject<boolean>();
  books: Book[] = [];
  page: number = 1;

  user: User;

  constructor(
    private bookService: BookService,
    private sessionStorageService: SessionStorageService,
    private authService: AuthenticationService,
    private cartService: CartService,
    private messageService: MessageService
  ) {
    this.user = <any>{};
  }

  cartItems: CartDetail[] = [];

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }

  ngOnInit() {
    this.bookService.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Book[]) => {
        this.books = data;
        this.fetchAverageRatings(); // Fetch average ratings after getting books
      }
    );
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
                      (error) => {
                        this.messageService.openError('Error add book to cart')
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
                        this.messageService.openError('Error add book to cart')
                      }
                    );
                  }
                } else {
                  this.messageService.openError('Error add book to cart')
                }
              },
              error => {
                this.messageService.openError('Cart data retrieval error')
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

      this.sessionStorageService.set('cartDetails', storedCartDetails);
    }
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

  getAvgStarArray(avgRating: number): any[] {
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
