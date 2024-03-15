import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar, faStarHalfStroke, faArrowRight, faPlus, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/interfaces/recipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';
import { UserRecipeService } from 'src/app/services/user-recipe.service';
import { UserRecipe } from 'src/app/interfaces/user-recipe';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('open', style({
        opacity: 1,
        height: '*',
      })),
      state('closed', style({
        opacity: 0,
        height: '0',
      })),
      transition('open <=> closed', [
        animate('0.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class RecipeComponent implements OnInit {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faArrowRight = faArrowRight;
  faPlus = faPlus;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    submittedBy: '',
    imageUrl: '',
    steps: [],
    ingredient: '',
    isShow: false,
  };

  userRecipe: UserRecipe = {
    id: 0,
    userId: 0,
    recipeId: 0,
    submissionDate: new Date(),
    isSelected: false,
  };

  showAllRecipes = true;
  showAddRecipeForm = false;
  activeButton: 'allRecipes' | 'addRecipe' = 'allRecipes';

  stepOpenStates: boolean[] = [];
  page: number = 1;

  public Editor = ClassicEditor;

  editorConfig = {
    toolbar: ['bold', 'italic', '|', 'NumberedList', 'BulletedList'],
    placeholder: 'Type the content here!'
  }

  get isClientLoggedIn(): boolean {
    return this.authService.isClientLoggedIn();
  }

  private destroy$: Subject<boolean> = new Subject<boolean>();
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private userRecipeService: UserRecipeService,
    private authService: AuthenticationService,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2,
    private snackBar: MatSnackBar
  ) {
    this.recipe.steps.forEach(() => this.stepOpenStates.push(true));
  }

  ngOnInit() {
    this.recipeService.getAllShowRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        console.log(this.recipes);
      }
    );
  }

  createRecipe() {
    if (this.isClientLoggedIn) {
      const token = localStorage.getItem('isClientLoggedIn');
      if (token) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.recipeService.createRecipe(this.recipe).subscribe(
              (response) => {
                if (response) {
                  this.userRecipe.userId = data.userInfo.id;
                  this.userRecipe.recipeId = response.id;

                  this.userRecipeService.createUserRecipe(this.userRecipe).subscribe(
                    (data) => {
                      this.snackBar.openFromComponent(SuccessSnackbarComponent, {
                        data: { message: 'Recipe created successfully!' },
                        panelClass: ['custom-snackbar'],
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'top'
                      });
                    },
                    (error) => {
                      console.error('Error creating user recipe:', error);

                      this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                        data: { message: 'Failed to create recipe. Please try again later' },
                        panelClass: ['custom-snackbar'],
                        duration: 3000,
                        horizontalPosition: 'end',
                        verticalPosition: 'top'
                      });
                    }
                  );


                }
              },
              (error) => {
                console.error('Error creating recipe:', error);

                this.snackBar.openFromComponent(ErrorSnackbarComponent, {
                  data: { message: 'Failed to create recipe. Please try again later' },
                  panelClass: ['custom-snackbar'],
                  duration: 3000,
                  horizontalPosition: 'end',
                  verticalPosition: 'top'
                });
              }
            );
          }
        );
      }
    }
  }


  addStep(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.recipe.steps.push({ id: 0, recipeId: 0, content: '', imageUrl: '' });
    this.stepOpenStates.push(true); // Open the newly added step by default
  }

  toggleStep(index: number): void {
    this.stepOpenStates[index] = !this.stepOpenStates[index];
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
