import { Component } from '@angular/core';
import { Login } from '../../interfaces/login';
import { faHome, faEyeSlash, faEye, faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { AuthResponse } from '../../interfaces/auth-response';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login-client',
  templateUrl: './login-client.component.html',
  styleUrls: ['./login-client.component.css']
})
export class LoginClientComponent {
  faHome = faHome;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;
  loginForm: FormGroup;

  authResponse: AuthResponse = {
    result: true,
    token: '',
    message: '',
    errors: [],
  };

  showPassword = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;

      this.authService.login(loginData).subscribe(
        (authResponse) => {
          localStorage.setItem('isClientLoggedIn', authResponse.token);
          sessionStorage.removeItem('cartDetails');
          this.router.navigate(['/home']);

          this.messageService.openSuccess('Login successful');
        },
        (error) => {
          this.messageService.openError('Login failed. Please try again');
        }
      );
    }

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  logoutClient(): void {
    this.authService.logoutClient();
    this.router.navigate(['/home']);
  }
}
