import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register';
import { Login } from '../interfaces/login';
import { AuthResponse } from '../interfaces/auth-response';
import { SendMail } from '../interfaces/send-mail';
import { ResetPassword } from '../interfaces/reset-password';

const baseUrl = 'http://localhost:5033/api/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(user: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${baseUrl}/UserRegister`, user);
  }

  login(user: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${baseUrl}/UserLogin`, user);
  }

  loginAdmin(admin: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${baseUrl}/AdminLogin`, admin);
  }

  logoutAdmin(): void {
    localStorage.removeItem('isAdminLoggedIn');
  }

  logoutClient(): void {
    localStorage.removeItem('isClientLoggedIn');
  }

  getUserInfo(token: string): Observable<any> {
    return this.http.get(`${baseUrl}/GetUserInfoByToken?token=${token}`);
  }

  sendOtpEmail(email: SendMail): Observable<any> {
    return this.http.post(`${baseUrl}/SendOtpEmail`, email);
  }

  resetPassword(data: ResetPassword): Observable<any> {
    return this.http.post(`${baseUrl}/ResetPassword`, data);
  }

  isTokenExpired(token: string): boolean {
    if (!token) return true; // Token doesn't exist, consider it expired

    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000); // Convert to milliseconds
    return expirationDate <= new Date(); // Check if expired
  }

  // Check if the client is logged in
  isClientLoggedIn(): boolean {
    const clientToken = localStorage.getItem('isClientLoggedIn');
    return !!clientToken;
  }
}
