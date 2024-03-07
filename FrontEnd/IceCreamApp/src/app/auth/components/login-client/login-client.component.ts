import { Component } from '@angular/core';
import { Login } from '../../interfaces/login';
import { faHome, faEyeSlash, faEye, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { AuthResponse } from '../../interfaces/auth-response';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
  loginDto: Login = {
    username: '',
    password: ''
  };
  authResponse: AuthResponse = {
    result: true,
    token: '',
    message: '',
    errors: [],
  };

  faHome = faHome;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  showPassword = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  login(): void {
    const data = {
      username: this.loginDto.username,
      password: this.loginDto.password
    }
    this.authService.login(data).subscribe(
      (authResponse) => {
        localStorage.setItem('isClientLoggedIn', authResponse.token);
        sessionStorage.removeItem('cartDetails');
        this.router.navigate(['/home']);

        this.snackBar.openFromComponent(SuccessSnackbarComponent, {
          data: { message: 'Login success!' },
          panelClass: ['custom-snackbar'],
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      },
      (error) => {
        this.snackBar.openFromComponent(ErrorSnackbarComponent, {
          data: { message: 'Error logging in. Please check your credentials and try again.' },
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

  logoutClient(): void {
    this.authService.logoutClient();
    this.router.navigate(['/home']);
  }
}
