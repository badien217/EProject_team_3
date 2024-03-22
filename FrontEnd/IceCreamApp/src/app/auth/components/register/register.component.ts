import { Component } from '@angular/core';
import { faHome, faEyeSlash, faEye, faCheck, faAngleRight, faArrowLeft, faAngleLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { Cart } from 'src/app/interfaces/cart';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

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

  registerForm: FormGroup;
  user: User;

  cart: Cart = {
    id: 0,
    userId: 0,
    cartDetails: []
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private cartService: CartService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.user = <any>{};
    this.registerForm = this.fb.group({
      name: ['', Validators.required, this.isNameValidAsync],
      username: ['', Validators.required, this.isUsernameValidAsync],
      phone: ['', [Validators.required, this.isPhoneValidAsync]],
      email: ['', Validators.required, this.isEmailValidAsync],
      password: ['', Validators.required, this.isPasswordValidAsync],
      subscriptionType: ['monthly', Validators.required],
      paymentOption: ['creditDebitCard', Validators.required],
      paymentStatus: [true],
      avatar: ['']
    });
  }

  isNameValidAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const regex = /^[^\d!@#$%^&*()\-\+=\[\]{};:'",.<>\/?|`~]*$/;
    const valid = regex.test(control.value);

    if (!valid) {
      return of({ 'invalidName': true });
    }
    return of(null);
  }

  isUsernameValidAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const username = control.value;
    const minLength = 6;
    const maxLength = 30;

    // Check if username length is within the specified range
    if (username.length < minLength || username.length > maxLength) {
      return of({ 'invalidLength': true });
    }

    // Regular expression for allowed characters
    const regex = /^[a-zA-Z0-9_\-@#!]+$/;
    const valid = regex.test(username);

    if (!valid) {
      return of({ 'invalidUsername': true });
    }

    return of(null);
  }

  isPhoneValidAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    const valid = regex.test(control.value);

    if (valid) {
      return of({ 'invalidPhoneNumber': true });
    }
    return of(null);
  }

  isPasswordValidAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const password = control.value;
    const minLength = 6;
    const maxLength = 30;

    if (password.length < minLength || password.length > maxLength) {
      return of({ 'invalidLength': true });
    }

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
    const valid = regex.test(password);

    if (!valid) {
      return of({ 'invalidPassword': true });
    }

    return of(null);
  }

  isEmailValidAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = regex.test(control.value);

    if (!valid) {
      return of({ 'invalidEmail': true });
    }
    return of(null);
  }

  register(): void {
    if (this.registerForm) {
      const registerData = this.registerForm.value;

      this.authService.register(registerData).subscribe(
        (authResponse) => {
          const token = authResponse.token;

          this.createCartForUser(token);
          this.router.navigate(['/auth/login']);

          this.messageService.openSuccess('Register successfully');
        },
        (error) => {
          this.messageService.openError('Register fail. Please try again');
        }
      );
    }
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
            this.messageService.openError('User data retrieval error')
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

  nextStep(form: FormGroup) {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(form: FormGroup) {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
