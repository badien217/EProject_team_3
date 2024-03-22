import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar, faStarHalfStroke, faUser, faClock, faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Step } from 'src/app/interfaces/step';
import { RecipeRating } from 'src/app/interfaces/recipe-rating';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { MessageService } from 'src/app/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
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

export class RecipeDetailsComponent implements OnInit, OnDestroy {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faUser = faUser;
  faClock = faClock;
  faMinus = faMinus;
  faPlus = faPlus;
  faArrowRight = faArrowRight;
  faStarRegular = faStarRegular;

  recipe: Recipe;
  recipeId!: number;
  recipes: Recipe[] = [];
  recipeRatings: RecipeRating[] = [];
  avgRating: number = 0;
  recipeRatingForm: FormGroup;
  isUserRated: boolean = false;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  userInfo: User;
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthenticationService,
    private fb: FormBuilder
  ) {
    this.recipe = <any>{};
    this.userInfo = <any>{};
    this.recipeRatingForm = this.fb.group({
      recipeId: [0],
      userId: [0],
      rating: [0, Validators.required],
      comment: ['', Validators.required],
      ratingDate: [new Date()]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.recipeId = +params['id'];
      this.retrieveRecipeDetails();
      this.retrieveRecipeRating();
      this.retrieveAvgRating();
      this.retrieveAllRecipes();
      this.getUserInfo();
    });

  }

  retrieveRecipeDetails(): void {
    this.recipeService.getRecipeById(this.recipeId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe) => {
        this.recipe = data;

        // Set the isStepOpen property of the first step to true
        if (this.recipe.steps.length > 0) {
          this.recipe.steps[0].isStepOpen = true;
        }
      }
    );
  }

  retrieveAllRecipes(): void {
    this.recipeService.getAllShowRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data.slice(0, 6);
      }
    );
  }

  retrieveRecipeRating(): void {
    this.recipeService.getRecipeRatingById(this.recipeId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: RecipeRating[]) => {
        this.recipeRatings = data;

        // Fetch user details for each rating
        this.recipeRatings.forEach(rating => {
          this.userService.getUserById(rating.userId).subscribe(
            (user: User) => {
              rating.name = user.name; // Assuming 'name' is the property containing the user's name
              rating.avatar = user.avatar;
            },
            error => {
              this.messageService.openError('Recipe rating data retrieval error')
            }
          );
        });
      }
    );
  }


  retrieveAvgRating(): void {
    this.recipeService.getAvgRating(this.recipeId).pipe(takeUntil(this.destroy$)).subscribe(
      data => { this.avgRating = data }
    );
  }

  toggleStep(step: Step): void {
    step.isStepOpen = !step.isStepOpen;
  }

  // Function to generate an array of star icons based on the rating number
  getStarArray(rating: number): any[] {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        starsArray.push({ icon: this.faStar });
      } else {
        starsArray.push({ icon: this.faStarRegular });
      }
    }
    return starsArray;
  }

  // Function to generate an array of star icons based on the average rating
  getAvgStarArray(): any[] {
    const avgStarArray = [];
    const fullStars = Math.floor(this.avgRating);
    const halfStar = this.avgRating - fullStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        avgStarArray.push({ icon: this.faStar });
      } else if (i === fullStars && halfStar) {
        avgStarArray.push({ icon: this.faStarHalfStroke });
      } else {
        avgStarArray.push({ icon: this.faStarRegular });
      }
    }
    return avgStarArray;
  }


  getUserInfo(): void {
    const token = localStorage.getItem('isClientLoggedIn');

    if (token) {
      if (!this.authService.isTokenExpired(token)) {
        this.authService.getUserInfo(token).pipe(takeUntil(this.destroy$)).subscribe(
          (data) => {
            this.userInfo = data.userInfo;
            this.checkIfUserRated(data.userInfo.id);
            this.recipeRatingForm = this.fb.group({
              recipeId: [this.recipeId],
              userId: [this.userInfo.id],
              rating: [0, Validators.required],
              comment: ['', Validators.required],
              ratingDate: [new Date()]
            });
          },
          error => {
            this.messageService.openError('User information data retrieval error')
          }
        );
      } else {
        // Token is expired, handle logout or redirect
        this.authService.logoutClient();
        // Redirect or any other action...
      }
    }
  }

  // Add method to check if user has rated
  checkIfUserRated(userId: number): void {
    this.isUserRated = this.recipeRatings.some(rating => rating.userId === userId);
  }

  createRecipeRating(): void {
    const data = this.recipeRatingForm.value

    this.recipeService.createRecipeRating(data).subscribe(
      response => {
        this.retrieveRecipeRating();
        this.retrieveAvgRating();
        this.messageService.openSuccess('Rating successfully');
      },
      error => {
        this.messageService.openError('Error rating. Please check your credentials');
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
