import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faIceCream, faUser, faCartShopping, faComment, faBook, faArrowRightFromBracket, faBellConcierge, faComments, faBottleDroplet, faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthResponse } from 'src/app/auth/interfaces/auth-response';
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
  faArrowRightFromBracket = faArrowRightFromBracket;
  faComments = faComments;
  faBellConcierge = faBellConcierge;
  faBottleDroplet = faBottleDroplet;
  faBars = faBars;

  authResponse: AuthResponse = {
    result: true,
    message: '',
    token: '',
    errors: [],
  };
  constructor(private authService: AuthenticationService, private router: Router) { }

  // New method for logout
  logoutAdmin(): void {
    this.authService.logoutAdmin();
    this.router.navigate(['/auth/admin/login-admin']); // Redirect to login page after logout
  }
}
