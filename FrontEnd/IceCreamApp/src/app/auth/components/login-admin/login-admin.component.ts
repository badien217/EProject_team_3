import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthResult } from '../../interfaces/auth-result';
import { Login } from '../../interfaces/login';

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

  authResult: AuthResult = {
    result: true,
    message: ''
  };
  constructor(private authService: AuthenticationService, private router: Router) { }

  loginAdmin(): void {
    const data = {
      username: this.loginDto.username,
      password: this.loginDto.password
    }
    this.authService.loginAdmin(data).subscribe((authResult) => {
      localStorage.setItem('isAdminLoggedIn', authResult.message);
      this.router.navigate(['/admin/dashboard']);
    });
  }

  // New method for logout
  logoutAdmin(): void {
    this.authService.logout();
    this.router.navigate(['/auth/admin/login-admin']); // Redirect to login page after logout
  }
}
