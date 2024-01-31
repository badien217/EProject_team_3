import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Subject, takeUntil } from 'rxjs';
import { faStar, faStarHalfStroke, faUser, faClock, faMinus, faPlus, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Recipe } from '../../../interfaces/recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../../../services/recipe.service';
import { Step } from '../../../interfaces/step';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css',
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
export class RecipeDetailsComponent  implements OnInit, OnDestroy {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faUser = faUser;
  faClock = faClock;
  faMinus = faMinus;
  faPlus = faPlus;
  faArrowRight = faArrowRight;

  recipe: Recipe;
  recipeId!: number;
  recipes: Recipe[] = [];
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {
    this.recipe = <any>{};
  }

  ngOnInit() {
    this.recipeId = +this.route.snapshot.params['id'];
    this.recipeService.getRecipeById(this.recipeId).pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe) => {
        this.recipe = data;

          // Set the isStepOpen property of the first step to true
          if (this.recipe.steps.length > 0) {
            this.recipe.steps[0].isStepOpen = true;
          }

        console.log(this.recipe);
      }
    );

    

    this.recipeService.getAllRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        console.log(this.recipes);
      }
    );
  }
  getIngredientsArray(): string[] {
    if (this.recipe && this.recipe.ingredient) {
      return this.recipe.ingredient.split('\n');
    }
    return [];
  }
  
  toggleStep(step: Step): void {
    step.isStepOpen = !step.isStepOpen;
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
