import { Component } from '@angular/core';
import { faHome, faEyeSlash, faEye, faCheck, faAngleRight, faArrowLeft, faAngleLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { SendMail } from '../../interfaces/send-mail';
import { ResetPassword } from '../../interfaces/reset-password';
import { AuthenticationService } from '../../services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

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

  otpEmailDto: SendMail = {
    toAddress: '',
  }

  resetPasswordDto: ResetPassword = {
    email: '',
    otpCode: '',
    newPassword: ''
  }

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  sendOtpEmail(): void {
    this.authService.sendOtpEmail(this.otpEmailDto).subscribe(
      response => {
        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Sent otp email!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      error => {
        console.log(error);
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Error sending otp. Please check your credentials and try again.' },
          panelClass: ['custom-snackbar', 'error'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
  }

  resetPassword(): void {
    const data = {
      email: this.otpEmailDto.toAddress,
      otpCode: this.resetPasswordDto.otpCode,
      newPassword: this.resetPasswordDto.newPassword
    }

    this.authService.resetPassword(data).subscribe(
      response => {
        this.router.navigate(['/auth/login']);

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Reset password successfully!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      error => {
        console.log(error);
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Error reset password. Please check your credentials and try again.' },
          panelClass: ['custom-snackbar', 'error'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
