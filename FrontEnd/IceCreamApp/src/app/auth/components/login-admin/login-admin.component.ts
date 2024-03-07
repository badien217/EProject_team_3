import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login';
import { AuthResponse } from '../../interfaces/auth-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginDto: Login = {
    username: '',
    password: ''
  };

  authResponse: AuthResponse = {
    result: true,
    message: '',
    token: '',
    errors: [],
  };

  faEyeSlash = faEyeSlash;
  faEye = faEye;

  showPassword = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthenticationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  private isFormValid(): boolean {
    return this.loginDto.username.trim() !== '' && this.loginDto.password.trim() !== '';
  }

  loginAdmin(): void {
    const data = {
      username: this.loginDto.username,
      password: this.loginDto.password
    }

    if (!this.isFormValid()) {
      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
        data: { message: 'Please fill in all required fields.' },
        panelClass: ['custom-snackbar'],
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
      return;
    }

    this.authService.loginAdmin(data).subscribe(
      (authResponse) => {
        localStorage.setItem('isAdminLoggedIn', authResponse.token);
        this.router.navigate(['/admin/dashboard']);

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Admin logged in successfully!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      (error) => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Error logging in. Please check your credentials and try again.' },
          panelClass: ['custom-snackbar'],
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

  logoutAdmin(): void {
    this.authService.logoutAdmin();
    this.router.navigate(['/auth/admin/login-admin']);
  }
}
