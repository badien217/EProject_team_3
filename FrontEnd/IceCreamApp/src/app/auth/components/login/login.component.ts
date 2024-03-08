import { Component } from '@angular/core';
import { faHome, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { Login } from '../../interfaces/login';
import { JwtAuth } from '../../interfaces/jwt-auth';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, FormGroupName, Validators } from '@angular/forms';
import { RefreshToken } from '../../interfaces/RefreshToken';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginDto: Login = {
    email : '',
    password: ''
  };
  loginBase = new FormGroup({
    email : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  })
  jwtDto: JwtAuth = {
    result: true,
    token: '',
    error: undefined,
    role :  []
  };
  RefreshTokens : RefreshToken = {
    accesstoken : '',
    refreshToken : ''
  }
  responsedata : any;
  faHome = faHome;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  showPassword = false;

  constructor(private authService: AuthenticationService, private router:Router,private http : HttpClient) { }
 
  processLogin(): void {
    const data = {
      email: this.loginDto.email,
      password: this.loginDto.password
    };
  
    this.authService.login(data).subscribe((jwtDto: any) => {
      console.log(jwtDto.refreshToken);
      console.log(jwtDto.token)
      this.RefreshTokens.accesstoken = jwtDto.token,
      this.RefreshTokens.refreshToken = jwtDto.refreshToken
      this.authService.RefreshTokens(this.RefreshTokens).subscribe((reponse) =>{
        console.log(reponse),
        this.authService.setToken(reponse.accesstoken)
      } );

     // localStorage.setItem('refreshToken', jwtDto.refreshToken);
     // localStorage.setItem('token', jwtDto.token); 
      localStorage.setItem('role', jwtDto.role); 
      console.log('Đăng nhập thành công, role:', jwtDto.role);
      
    });
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
