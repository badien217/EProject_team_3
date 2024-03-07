import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WarningSnackbarComponent } from '../shared/components/warning-snackbar/warning-snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../auth/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {

    constructor(private router: Router, private snackBar: MatSnackBar, private authService: AuthenticationService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const tokenClient = localStorage.getItem('isClientLoggedIn');
        if (tokenClient) {
            if (!this.authService.isTokenExpired(tokenClient)) {
                // Token is not expired, allow access
                return true;
            } else {
                // Token is expired, display warning message and redirect to login page
                this.snackBar.openFromComponent(WarningSnackbarComponent, {
                    data: { message: 'Your session has expired. Please log in again.' },
                    panelClass: ['custom-snackbar'],
                    duration: 3000,
                    horizontalPosition: 'end',
                    verticalPosition: 'top'
                });
                this.router.navigate(['/auth/login']); // Adjust the route according to your application
                return false;
            }
        } else {
            this.snackBar.openFromComponent(WarningSnackbarComponent, {
                data: { message: 'You have to login first!' },
                panelClass: ['custom-snackbar'],
                duration: 3000,
                horizontalPosition: 'end',
                verticalPosition: 'top'
            });
            return false;
        }
    }
}
