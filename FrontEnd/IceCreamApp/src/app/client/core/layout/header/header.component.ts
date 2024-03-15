import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { faMagnifyingGlass, faUser, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { AuthResponse } from 'src/app/auth/interfaces/auth-response';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Book } from 'src/app/interfaces/book';
import { User } from 'src/app/interfaces/user';
import { CartService } from 'src/app/services/cart.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { ConfirmWarningDialogComponent } from 'src/app/shared/components/confirm-warning-dialog/confirm-warning-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faBars = faBars;

  avatarFirstLetter?: string;
  avatarBackgroundColor?: string;
  avatarTextColor?: string;

  authResponse: AuthResponse = {
    result: true,
    message: '',
    token: '',
    errors: [],
  };

  userInfo: User;
  cartDetailLengthFromServer: number = 0;

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public sessionStorageService: SessionStorageService,
    private dialog: MatDialog,
    private cartService: CartService
  ) {
    this.userInfo = <User>{};
  }

  async ngOnInit(): Promise<void> {
    await this.handleLoggedIn();

    // Subscribe to the cartUpdated event
    this.sessionStorageService.cartUpdated.subscribe(() => {
      this.updateCartItemsLength();
    });

    // Subscribe to the observable to get updates
    this.cartService.cartDetailTotal$.pipe(takeUntil(this.destroy$)).subscribe(
      (total: number) => {
        this.cartDetailLengthFromServer = total;

        console.log('total ', total)
      }
    );

    // Update cart items length initially
    this.updateCartItemsLength();
  }

  async handleLoggedIn(): Promise<void> {
    const token = localStorage.getItem('isClientLoggedIn');

    if (token && !this.authService.isTokenExpired(token)) {
      try {
        const data = await this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).toPromise();

        this.userInfo = data.userInfo;

        this.cartService.getLatestCartByUserId(data.userInfo.id).subscribe(
          (cart) => {
            this.cartDetailLengthFromServer = cart.cartDetails.length;
          }
        )
        // Generate the first letter of the name
        this.avatarFirstLetter = this.userInfo.name.charAt(0).toUpperCase();

        // Generate random background color and text color
        this.avatarBackgroundColor = this.generateRandomColor();
        this.avatarTextColor = this.calculateContrastColor(this.avatarBackgroundColor);

      } catch (error) {
        // Handle error
        console.error('Error fetching user info:', error);
        this.authService.logoutClient(); // Logout user if error occurs
      }
    } else {
      // Token is expired or doesn't exist, logout user
      this.authService.logoutClient();
    }
  }

  updateCartItemsLength(): void {
    // Get the cart items from sessionStorage
    const cartItems: Book[] = this.sessionStorageService.getCartItems();
    this.sessionStorageService.cartItemsLength = cartItems.length;
  }
  generateRandomColor(): string {
    // Generate a random hexadecimal color code
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  calculateContrastColor(hexColor: string): string {
    // Calculate the contrast color based on the brightness of the background color
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 128 ? '#000000' : '#ffffff';
  }

  logoutClient(): void {
    const dialogRef = this.dialog.open(ConfirmWarningDialogComponent, {
      data: { message: 'Are you sure you want to log out?' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.authService.logoutClient();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}