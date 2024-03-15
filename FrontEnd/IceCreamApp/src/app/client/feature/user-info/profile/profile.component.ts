import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserRecipe } from 'src/app/interfaces/user-recipe';
import { UserRecipeService } from 'src/app/services/user-recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  faCamera = faCamera;
  faArrowRight = faArrowRight;
  userInfo: any;

  userRecipes: UserRecipe[] = [];

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private userRecipeService: UserRecipeService,
    private recipeService: RecipeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) { }

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit(): void {
    if (this.isClientLoggedIn) {
      const token = localStorage.getItem('isClientLoggedIn');
      if (token) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.userInfo = data.userInfo;

            this.retrieveUserRecipeByUserId(data.userInfo.id);
          },
          (error) => {
            console.error('Error fetching user information:', error);
          }
        );
      } else {
        // Token is expired, handle logout or redirect
        this.authService.logoutClient();
        // Redirect or any other action...
      }
    }
  }

  retrieveUserRecipeByUserId(userId: number) {
    this.userRecipeService.getUserRecipeByUserId(userId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: UserRecipe[]) => {
        data.forEach(userRecipe => {
          // Fetch username for the user using userId
          this.recipeService.getRecipeById(userRecipe.recipeId).pipe(takeUntil(this.destroy$)).subscribe(
            (recipeData) => {
              userRecipe.recipeName = recipeData.name;
              userRecipe.recipeDescription = recipeData.description;
            },
            error => {
              console.error(`Error fetching username for user with userId ${userRecipe.userId}: `, error);
            }
          );
        });

        this.userRecipes = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  openUpdateUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.updateUser(user.id, result).subscribe(updatedUser => {
          // Check which fields have changed
          const changedFields: string[] = [];
          if (updatedUser.name !== this.userInfo.name) {
            changedFields.push('name');
          }
          if (updatedUser.phone !== this.userInfo.phone) {
            changedFields.push('phone');
          }
          // You can add more comparisons for other fields if needed

          // Update userInfo with changed fields only
          changedFields.forEach(field => {
            this.userInfo[field] = updatedUser[field];
          });

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'User updated successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          console.error('Error while updating user:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to update user. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });
      }
    });
  }


}
