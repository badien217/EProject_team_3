import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtAuth } from '../interfaces/jwt-auth';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register';
import { AuthResult } from '../interfaces/auth-result';
import { Login } from '../interfaces/login';

const registerUrl = "http://localhost:5175/api/AuthManagement/Register";
const loginUrl = "http://localhost:5175/api/AuthManagement/Login";
const loginAdminUrl = "http://localhost:5215/api/Auth/loginAdmin";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

   register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(registerUrl, user);
  }

   login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(loginUrl, user);
  }

  loginAdmin(admin: Login) : Observable<AuthResult>{
    return this.http.post<AuthResult>(loginAdminUrl, admin);
  }

  
  // New method for logout
  logout(): void {
    localStorage.removeItem('isAdminLoggedIn');
  }
}
