import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faXmark, faAngleRight, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Book } from 'src/app/interfaces/book';
import { CartDetail } from 'src/app/interfaces/cart-detail';
import { Order } from 'src/app/interfaces/order';
import { OrderDetail } from 'src/app/interfaces/order-detail';
import { User } from 'src/app/interfaces/user';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { InfoSnackbarComponent } from 'src/app/shared/components/info-snackbar/info-snackbar.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  faXmark = faXmark;
  faAngleRight = faAngleRight;
  faMinus = faMinus;
  faPlus = faPlus;

  selectedPaymentOption: string = 'paymentOnDelivery';

  order: Order = {
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentOption: 'Payment on delivery',
    amount: 0,
    transactionStatus: false,
    orderDate: new Date(''),
    orderDetails: [],
  };

  userInfo: User;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }

  @ViewChild('orderForm') orderForm!: NgForm;

  constructor(
    private sessionStorageService: SessionStorageService,
    private orderService: OrderService,
    private cartService: CartService,
    private bookService: BookService,
    private snackBar: MatSnackBar,
    private authService: AuthenticationService
  ) {
    this.userInfo = <User>{};
  }

  ngOnInit(): void {
    this.retrieveCartData();
    const token = localStorage.getItem('isClientLoggedIn');

    if (token) {
      if (!this.authService.isTokenExpired(token)) {
        // Token is not expired, fetch user information
        this.authService.getUserInfo(token).subscribe(
          (data) => {
            this.userInfo = data.userInfo;

            this.order = {
              name: this.userInfo.name,
              email: this.userInfo.email,
              phone: this.userInfo.phone,
              address: '',
              paymentOption: 'Payment on delivery',
              amount: this.order.amount,
              transactionStatus: false,
              orderDate: new Date(),
              orderDetails: [],
            };
          },
          (error) => {
            console.error('Error fetching user information', error);
          }
        );
      } else {
        this.authService.logoutClient();
      }
    }
  }

  cartDetailsWithBooks: { cartDetail: CartDetail, book: Book }[] = [];

  async retrieveCartData(): Promise<void> {
    const token = localStorage.getItem('isClientLoggedIn');

    if (token && !this.authService.isTokenExpired(token)) {
      try {
        const data = await this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).toPromise();

        this.userInfo = data.userInfo;

        this.cartService.getLatestCartByUserId(data.userInfo.id).subscribe(
          async (cart) => {
            this.cartService.updateCartDetailTotal(cart.cartDetails.length);
            // Clear the array before populating it with new data
            this.cartDetailsWithBooks = [];

            // Log cart details along with book data
            // Inside the for loop
            for (const cartDetail of cart.cartDetails) {
              try {
                const book = await this.bookService.getBookById(cartDetail.bookId).toPromise();
                if (book) {
                  // Push the pair of CartDetail and Book to the array
                  this.cartDetailsWithBooks.push({ cartDetail, book } as { cartDetail: CartDetail, book: Book });
                } else {
                  console.error('Book not found for CartDetail:', cartDetail);
                }
              } catch (error) {
                console.error('Error fetching book data:', error);
              }
            }

          },
          (error) => {
            console.error('Error fetching cart data:', error);
          }
        );
      } catch (error) {
        // Handle error
        console.error('Error fetching user info:', error);
        this.authService.logoutClient();
      }
    } else {
      // User is not logged in, check if there is cart data in session storage
      const storedCartDetailsJson = sessionStorage.getItem('cartDetails');
      if (storedCartDetailsJson) {
        const storedCartDetails: CartDetail[] = JSON.parse(storedCartDetailsJson);

        // Clear the array before populating it with session storage data
        this.cartDetailsWithBooks = [];

        // Log cart details along with book data from session storage
        // Inside the for loop
        for (const cartDetail of storedCartDetails) {
          try {
            const book = await this.bookService.getBookById(cartDetail.bookId).toPromise();
            if (book) {
              // Push the pair of CartDetail and Book to the array
              this.cartDetailsWithBooks.push({ cartDetail, book } as { cartDetail: CartDetail, book: Book });
            } else {
              console.error('Book not found for CartDetail:', cartDetail);
            }
          } catch (error) {
            console.error('Error fetching book data:', error);
          }
        }
      }
    }
  }


  selectPaymentOption(paymentOption: string): void {
    this.selectedPaymentOption = paymentOption;
  }


  // Inside OrderComponent class
  removeCartDetail(cartDetailId: number): void {
    if (this.isClientLoggedIn) {
      this.cartService.deleteCartDetail(cartDetailId).subscribe(
        () => {
          // Successful deletion, you may want to update the cart data or do additional actions
          console.log(`Cart Detail with ID ${cartDetailId} removed successfully.`);
          // Optionally, you can retrieve the updated cart data after removal
          this.retrieveCartData();
        },
        (error) => {
          console.error('Error removing cart detail:', error);
          // Handle the error as needed
        }
      );
    } else {
      // User is not logged in, remove from session storage
      const storedCartDetailsJson = sessionStorage.getItem('cartDetails');
      if (storedCartDetailsJson) {
        let storedCartDetails: CartDetail[] = JSON.parse(storedCartDetailsJson);

        // Find the index of the item to be removed
        const indexToRemove = storedCartDetails.findIndex(detail => detail.id === cartDetailId);

        // If the item is found, remove it from the array
        if (indexToRemove !== -1) {
          storedCartDetails.splice(indexToRemove, 1);

          // Save the updated cart details back to session storage
          // sessionStorage.setItem('cartDetails', JSON.stringify(storedCartDetails));
          this.sessionStorageService.set('cartDetails', storedCartDetails);
          // Optionally, you can update the component with the new session storage data
          this.retrieveCartData();
          console.log(`Cart Detail with ID ${cartDetailId} removed from session storage successfully.`);
        } else {
          console.warn(`Cart Detail with ID ${cartDetailId} not found in session storage.`);
        }
      }
    }
  }

  // Inside OrderComponent class
  updateCartDetailQuantity(cartDetail: CartDetail, increment: boolean): void {
    if (this.isClientLoggedIn) {
      // Increment or decrement the quantity based on the 'increment' parameter
      cartDetail.quantity += increment ? 1 : -1;

      // Ensure that the quantity is always greater than 1
      cartDetail.quantity = Math.max(cartDetail.quantity, 1);

      // Call the CartService to update the cart detail quantity
      this.cartService.updateCartDetail(cartDetail.id, { quantity: cartDetail.quantity }).subscribe(
        () => {
          // Successful update, you may want to retrieve the updated cart data or do additional actions
          console.log(`Cart Detail with ID ${cartDetail.id} quantity updated successfully.`);
        },
        (error) => {
          console.error('Error updating cart detail quantity:', error);
          // Handle the error as needed, you may want to revert the quantity change on error
        }
      );
    } else {
      // User is not logged in, update the session storage cart detail quantity
      const storedCartDetailsJson = sessionStorage.getItem('cartDetails');
      if (storedCartDetailsJson) {
        let storedCartDetails: CartDetail[] = JSON.parse(storedCartDetailsJson);

        // Find the index of the item to be updated
        const indexToUpdate = storedCartDetails.findIndex(detail => detail.bookId === cartDetail.bookId);

        // If the item is found, update its quantity in the array
        if (indexToUpdate !== -1) {
          // Increment or decrement the quantity based on the 'increment' parameter
          storedCartDetails[indexToUpdate].quantity += increment ? 1 : -1;

          // Ensure that the quantity is always greater than 1
          storedCartDetails[indexToUpdate].quantity = Math.max(storedCartDetails[indexToUpdate].quantity, 1);

          // Save the updated cart details back to session storage
          sessionStorage.setItem('cartDetails', JSON.stringify(storedCartDetails));

          // Optionally, you can update the component with the new session storage data
          // this.retrieveCartData();
          console.log(`Cart Detail with bookId ${cartDetail.bookId} quantity updated in session storage successfully.`);
        } else {
          console.warn(`Cart Detail with bookId ${cartDetail.bookId} not found in session storage.`);
        }
      }
    }
  }

  createOrder(): void {
    if (this.isClientLoggedIn) {
      const orderDetails = this.cartDetailsWithBooks.map(item => {
        return {
          orderId: 0,
          bookId: item.cartDetail.bookId,
          quantity: item.cartDetail.quantity
        } as OrderDetail;
      });

      // Simulate order creation (replace this with your actual logic)
      const simulatedOrder: Order = {
        name: this.order.name,
        email: this.order.email,
        phone: this.order.phone,
        address: this.order.address,
        paymentOption: this.order.paymentOption,
        amount: this.calculateTotalAmount(),
        transactionStatus: false,
        orderDate: new Date(),
        orderDetails: orderDetails,
      };

      this.orderService.createOrder(simulatedOrder).subscribe(
        (data) => {
          this.snackBar.openFromComponent(InfoSnackbarComponent, {
            duration: 3000,
            data: { message: 'Order Confirmed! Check your email for updates.' },
            panelClass: ['custom-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });

          // Successfully created order, now delete cart details
          this.deleteAllCartDetails();
          this.retrieveCartData();
        },
        (error) => {
          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            duration: 3000,
            data: { message: 'Failed to create order. Please try again.' },
            panelClass: ['custom-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }
      );
    } else {
      // User is not logged in, handle order creation without server-side processing
      const storedCartDetailsJson = sessionStorage.getItem('cartDetails');
      if (storedCartDetailsJson) {
        const storedCartDetails: CartDetail[] = JSON.parse(storedCartDetailsJson);

        // Map cart details to order details
        const orderDetails = storedCartDetails.map(item => {
          return {
            orderId: 0,
            bookId: item.bookId,  // Assuming bookId is a property of CartDetail
            quantity: item.quantity
          } as OrderDetail;
        });

        // Simulate order creation (replace this with your actual logic)
        const simulatedOrder: Order = {
          name: this.order.name,
          email: this.order.email,
          phone: this.order.phone,
          address: this.order.address,
          paymentOption: this.order.paymentOption,
          amount: this.calculateTotalAmount(),
          transactionStatus: false,
          orderDate: new Date(),
          orderDetails: orderDetails,
        };

        this.orderService.createOrder(simulatedOrder).subscribe(
          (data) => {
            // Show success message
            this.snackBar.openFromComponent(InfoSnackbarComponent, {
              duration: 3000,
              data: { message: 'Order Confirmed! Check your email for updates.' },
              panelClass: ['custom-snackbar'],
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });

            // Clear the cart and update the component
            this.sessionStorageService.remove('cartDetails');
            this.cartDetailsWithBooks = [];

            // Reset the order form
            this.orderForm.resetForm();

            // Optionally, you can retrieve the updated cart data after removal
            this.retrieveCartData();

            console.log('Simulated order created:', simulatedOrder);
          }
        );
      } else {
        console.warn('No cart details found in session storage.');
      }

    }
  }

  deleteAllCartDetails(): void {
    const token = localStorage.getItem('isClientLoggedIn');

    if (token && !this.authService.isTokenExpired(token)) {
      this.cartService.getLatestCartByUserId(this.userInfo.id).subscribe(
        (cart) => {
          for (const cartDetail of cart.cartDetails) {
            this.cartService.deleteCartDetail(cartDetail.id).subscribe(
              () => {
                this.retrieveCartData();
                console.log(`Cart Detail with ID ${cartDetail.id} removed successfully.`);
              },
              (error) => {
                console.error('Error removing cart detail:', error);
              }
            );
          }
          // Clear the cart details after deletion
          this.cartDetailsWithBooks = [];
          console.log('All cart details deleted successfully.');
        },
        (error) => {
          console.error('Error fetching cart data:', error);
        }
      );
    }
  }

  // Inside OrderComponent class
  calculateTotalAmount(): number {
    let totalAmount = 0;

    for (const item of this.cartDetailsWithBooks) {
      // Assuming each item has a property 'book' with a 'price' and 'cartDetail' with 'quantity'
      totalAmount += item.book.price * item.cartDetail.quantity;
    }

    return totalAmount;
  }

}
