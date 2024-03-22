import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { MatDialog } from '@angular/material/dialog';
import { faArrowRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import { UserRecipe } from 'src/app/interfaces/user-recipe';
import { UserRecipeService } from 'src/app/services/user-recipe.service';
import { Subject, takeUntil } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { UpdateAvatarComponent } from '../update-avatar/update-avatar.component';
import { MessageService } from 'src/app/services/message.service';

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
    private messageService: MessageService,
    private router: Router,
    private dialog: MatDialog,
  ) { }

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }
  private destroy$: Subject<boolean> = new Subject<boolean>();


  ngOnInit(): void {
    this.retrieveUserData();
  }

  retrieveUserData(): void {
    if (this.isClientLoggedIn) {
      const token = localStorage.getItem('isClientLoggedIn');
      if (token) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.userInfo = data.userInfo;

            this.retrieveUserRecipeByUserId(data.userInfo.id);
          },
          (error) => {
            this.messageService.openError('User information retrieval error')
          }
        );
      } else {
        this.authService.logoutClient();
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
            (error) => {
              this.messageService.openError('User recipes data retrieval error')
            }
          );
        });

        this.userRecipes = data;
      },
      (error) => {
        this.messageService.openError('User recipes data retrieval error')
      }
    )
  }

  openUpdateUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {
        id: user.id,
        name: user.name,
        phone: user.phone
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveUserData();
      }
    });
  }

  openUploadAvatarDialog(user: User): void {
    const dialogRef = this.dialog.open(UpdateAvatarComponent, {
      data: {
        id: user.id,
        avatar: user.avatar
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.retrieveUserData();
      }
    });
  }

}
