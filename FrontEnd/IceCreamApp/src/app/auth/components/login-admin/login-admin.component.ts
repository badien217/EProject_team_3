import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AuthResult } from '../../interfaces/auth-result';
import { Login } from '../../interfaces/login';
import { JwtAuth } from '../../interfaces/jwt-auth';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  loginDto: Login = {
    email: '',
    password: ''
  };
  jwtDto: JwtAuth = {
    result: true,
    token: '',
    error: undefined,
    role :  []
  };

  authResult: AuthResult = {
    result: true,
    message: ''
  };

  constructor(private authService: AuthenticationService, private router: Router) { }

  loginAdmin(): void {
    localStorage.clear();
    const data = {
      email: this.loginDto.email,
      password: this.loginDto.password
    }

    this.authService.loginAdmin(data).subscribe((jwtDto : any) => {
      if(jwtDto.role == 'admin')
        this.router.navigate(['/admin/dashboard']);
      else{
        this.router.navigate(['']);
      }
    });
  }

  // New method for logout
  logoutAdmin(): void {
    this.authService.logout();
    this.router.navigate(['/auth/admin/login-admin']); // Redirect to login page after logout
  }
  clearLocalStorage() {
    localStorage.clear();
  }
}
