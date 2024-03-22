import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthResponse } from '../../interfaces/auth-response';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginForm: FormGroup;
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
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }


  loginAdmin(): void {
    const data = this.loginForm.value;

    if (this.loginForm.valid) {
      this.authService.loginAdmin(data).subscribe(
        (authResponse) => {
          localStorage.setItem('isAdminLoggedIn', authResponse.token);
          this.router.navigate(['/admin/dashboard']);
          this.messageService.openSuccess('Admin logged in successfully');
        },
        (error) => {
          this.messageService.openError('Fail to login admin. Please try again');
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  logoutAdmin(): void {
    this.authService.logoutAdmin();
    this.router.navigate(['/auth/admin/login-admin']);
  }
}
