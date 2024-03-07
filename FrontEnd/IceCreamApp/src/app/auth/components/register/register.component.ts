import { Component } from '@angular/core';
import { faHome, faEyeSlash, faEye, faCheck, faAngleRight, faArrowLeft, faAngleLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/register';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { CartService } from 'src/app/services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Cart } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private destroy$: Subject<boolean> = new Subject<boolean>();

  faHome = faHome;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faCheck = faCheck;
  faAngleRight = faAngleRight;
  faArrowLeft = faArrowLeft;
  faAngleLeft = faAngleLeft;
  faArrowRight = faArrowRight;

  currentStep: number = 1;
  showPassword = false;
  selectedSubscription: string = 'monthly'; // Default to 'monthly'
  selectedPaymentOption: string = 'creditDebitCard';

  registerDto: Register = {
    username: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    subscriptionType: 'monthly',
    paymentOption: 'creditDebitCard'
  }

  user: User;

  cart: Cart = {
    id: 0,
    userId: 0,
    cartDetails: []
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar,
    private cartService: CartService
  ) {
    this.user = <any>{};
  }

  register(): void {
    const data = {
      username: this.registerDto.username,
      name: this.registerDto.name,
      email: this.registerDto.email,
      phone: this.registerDto.phone,
      password: this.registerDto.password,
      subscriptionType: this.registerDto.subscriptionType,
      paymentOption: this.registerDto.paymentOption,
      avatar: ''
    }

    this.authService.register(data).subscribe(
      (authResponse) => {
        console.log(authResponse);

        const token = authResponse.token;

        this.createCartForUser(token);
        this.router.navigate(['/auth/login']);

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Register success!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      (error) => {
        console.log(error);
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Error register. Please try again.' },
          panelClass: ['custom-snackbar', 'error'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
  }

  // Method to create a cart for the user
  private createCartForUser(token: string): void {
    if (token) {
      if (!this.authService.isTokenExpired(token)) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.user = data.userInfo;
            this.cart.userId = this.user.id;

            this.cartService.createCart(this.cart).subscribe(
              (cart: Cart) => {
                console.log('User has a cart:', cart);
              },
              error => {
                // Handle error if cart information cannot be fetched
                console.error('Error fetching user cart information', error);
              }
            );
          },
          error => {
            // Handle error if user information cannot be fetched
            console.error('Error fetching user information', error);
          }
        );
      } else {
        this.authService.logoutClient();
      }
    }
  }

  // Add a method to handle changes in the selected subscription
  selectSubscription(subscriptionType: string): void {
    this.selectedSubscription = subscriptionType;
  }

  selectPaymentOption(paymentOption: string): void {
    this.selectedPaymentOption = paymentOption;
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
