import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtAuth } from '../interfaces/jwt-auth';
import { Observable } from 'rxjs';
import { Register } from '../interfaces/register';
import { AuthResult } from '../interfaces/auth-result';
import { Login } from '../interfaces/login';
import { JwtHelperService } from '@auth0/angular-jwt';


const loginUrl = "http://localhost:5175/api/AuthManagement/Login";
const loginAdminUrl = "http://localhost:5215/api/Auth/loginAdmin";
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': 'http://localhost:7127' 
};



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "http://localhost:8080/api/ValuesController1/AuthRegister";
  LoginUrlAuthentication = "http://localhost:8080/api/ValuesController1/login";
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

   register(user: Register): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.registerUrl, user);
  }
  registerUser(obj : any) {
  return this.http.post(this.registerUrl,obj)
  }

  
   login(user: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(this.LoginUrlAuthentication, user);
  }
  processlogin(obj:any){
    return this.http.post(this.LoginUrlAuthentication,obj,{headers})
  }
  loginAdmin(admin: Login) : Observable<AuthResult>{
    return this.http.post<AuthResult>(this.LoginUrlAuthentication, admin);
  }
  GetToken() {
    return localStorage.getItem("token") || '';
  }
  GetRefreshToken() {
    return localStorage.getItem("refreshtoken") || '';
  }

  SaveTokens(tokendata: any) {
    localStorage.setItem('token', tokendata.jwtToken);
    localStorage.setItem('refreshtoken', tokendata.refreshToken);
  }
  GenerateRefreshToken() {
    let input = {
      "jwtToken": this.GetToken(),
      "refreshToken": this.GetRefreshToken()
    }
    return this.http.post(this.LoginUrlAuthentication + 'refresh', input);
  }
  getInformation(token : string): string | null {
    try {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.name || null;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  

  isLoggedIn(tokens :string): boolean {
    const token = tokens; 
    return !this.jwtHelper.isTokenExpired(token);
  }
  logout(): void {
    localStorage.removeItem('isAdminLoggedIn');
  }
}
