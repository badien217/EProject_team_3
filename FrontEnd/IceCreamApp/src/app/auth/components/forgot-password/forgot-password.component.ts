import { Component } from '@angular/core';
import { faHome, faEyeSlash, faEye, faCheck, faAngleRight, faArrowLeft, faAngleLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  faHome = faHome;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faCheck = faCheck;
  faAngleRight = faAngleRight;
  faArrowLeft = faArrowLeft;
  faAngleLeft = faAngleLeft;
  faArrowRight = faArrowRight;

  showPassword = false;

  otpForm: FormGroup;
  resetPasswordForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.otpForm = this.fb.group({
      toAddress: ['', Validators.required, this.isEmailValidAsync]
    });

    this.resetPasswordForm = this.fb.group({
      email: ['', Validators.required],
      otpCode: ['', Validators.required, this.isOtpValidAsync],
      newPassword: ['', Validators.required, this.isPasswordValidAsync]
    });
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

  isOtpValidAsync(control: AbstractControl):
    Observable<ValidationErrors | null> {
    const otp = control.value;
    const length = 6;

    if (!otp || otp.toString().length !== length || isNaN(otp)) {
      return of({ 'invalidLength': true });
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

  sendOtpEmail(): void {
    const data = this.otpForm.value;
    const emailControl = this.resetPasswordForm.get('email');
    if (!emailControl) {
      return;
    }

    emailControl.setValue(data.toAddress);

    this.authService.sendOtpEmail(data).subscribe(
      (response) => {
        this.messageService.openSuccess('Sent otp email');
      },
      error => {
        this.messageService.openError('Error sending otp. Please check your credentials');
      }
    );
  }

  resetPassword(): void {
    const data = this.resetPasswordForm.value;

    this.authService.resetPassword(data).subscribe(
      response => {
        this.router.navigate(['/auth/login']);

        this.messageService.openSuccess('Reset password successfully');
      },
      error => {
        this.messageService.openError('Error reset password. Please check your credentials');
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
