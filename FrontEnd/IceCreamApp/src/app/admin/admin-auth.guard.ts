import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../auth/services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const tokenAdmin = localStorage.getItem('isAdminLoggedIn');
    if (tokenAdmin) {
      if (!this.authService.isTokenExpired(tokenAdmin)) {
        // Token is not expired, allow access
        return true;
      } else {
        // Token is expired, handle logout or redirect
        this.authService.logoutAdmin();
        this.router.navigate(['/auth/admin/login-admin']);
        return false;
      }
    } else {
      // Admin not logged in, redirect to login page
      this.router.navigate(['/auth/admin/login-admin']);
      return false;
    }
  }

}
