import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faIceCream, faUser, faCartShopping, faComment, faBook, faPowerOff, faBookOpen, faComments } from '@fortawesome/free-solid-svg-icons';
import { AuthResult } from 'src/app/auth/interfaces/auth-result';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faHouse = faHouse;
  faIceCream = faIceCream;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faComment = faComment;
  faBook = faBook;
  faPowerOff = faPowerOff;
  faBookOpen = faBookOpen;
  faComments = faComments;

  // loginDto: Login = {
  //   username: '',
  //   password: ''
  // };

  authResult: AuthResult = {
    result: true,
    message: ''
  };
  constructor(private authService: AuthenticationService, private router: Router) { }

  // New method for logout
  logoutAdmin(): void {
    this.authService.logout();
    this.router.navigate(['/auth/admin/login-admin']); // Redirect to login page after logout
  }
}
