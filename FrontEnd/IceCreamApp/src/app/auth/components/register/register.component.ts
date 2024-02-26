import { Component } from '@angular/core';
import { faHome, faEyeSlash, faEye, faCheck, faAngleRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Register } from '../../interfaces/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  faHome = faHome;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faCheck = faCheck;
  faAngleRight = faAngleRight;
  faArrowLeft = faArrowLeft;

  currentStep: number = 1;
  showPassword = false;
  selectedSubscription: string = 'monthly'; // Default to 'monthly'
  selectedPaymentOption: string = 'creditDebitCard';

  registerDto: Register = {
    fullname: '',
    email: '',
    password: '',
    phone: '',
    subscriptionType: 'monthly',
    paymentOption: 'creditDebitCard'
  }

  constructor(private authService: AuthenticationService, private router: Router) { }

  register(): void {
    const data = {
      fullname: this.registerDto.fullname,
      email: this.registerDto.email,
      password: this.registerDto.password,
      phone: this.registerDto.phone,
      subscriptionType: this.registerDto.subscriptionType,
      paymentOption: this.registerDto.paymentOption
    }
    this.authService.registerUser(data).subscribe(()=>{
      console.log(data);
      this.router.navigate(['/auth/login']);
    });  
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
