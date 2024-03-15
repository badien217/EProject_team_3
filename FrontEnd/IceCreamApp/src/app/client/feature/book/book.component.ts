import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faStar, faStarHalfStroke, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/interfaces/cart';
import { CartDetail } from 'src/app/interfaces/cart-detail';

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
    private snackBar: MatSnackBar,
    private authService: AuthenticationService,
    private cartService: CartService
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
                        console.log('Cart detail updated successfully.');
                        this.cartService.updateCartDetailTotal(cart.cartDetails.length);
                      },
                      error => {
                        console.error('Error updating cart detail:', error);
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
                        console.log('New cart detail added successfully.');
                        this.cartService.updateCartDetailTotal(cart.cartDetails.length + 1);
                      },
                      error => {
                        console.error('Error adding new cart detail:', error);
                      }
                    );
                  }
                } else {
                  console.log('No cart found for the user.');
                }
              },
              error => {
                console.error('Error fetching cart:', error);
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

      // Optionally, you can perform any additional logic or UI updates here
      console.log('Cart detail added to session storage successfully.');
    }
  }

  fetchAverageRatings() {
    this.books.forEach(book => {
      this.bookService.getAvgRating(book.id).subscribe(
        (avgRating: number) => {
          book.averageRating = avgRating;
        },
        error => {
          console.error(`Error fetching average rating for book ${book.id}: `, error);
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
