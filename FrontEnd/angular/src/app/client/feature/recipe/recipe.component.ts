import { Component, OnInit, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faStar, faStarHalfStroke, faArrowRight, faPlus, faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from '../../../interfaces/recipe';
import { RecipeService } from '../../../services/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
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
    name: '',
    description: '',
    submittedBy: '',
    imageUrl: '',
    steps: [],
    ingredient: '',
  };

  showAllRecipes = true;
  showAddRecipeForm = false;
  activeButton: 'allRecipes' | 'addRecipe' = 'allRecipes';

  ingredients: string[] = [];
  listIngredientInput = new FormControl('');

  stepOpenStates: boolean[] = [];



  private destroy$: Subject<boolean> = new Subject<boolean>();
  recipes: Recipe[] = [];

  constructor(
    private recipeService: RecipeService,
    private http: HttpClient,
    private router: Router,
    private renderer: Renderer2
  ) {
    this.listIngredientInput.valueChanges.subscribe(value => {
      if (value !== null) {
        this.ingredients = value.split('\n').filter(item => item.trim() !== "");
      }
    });

    this.recipe.steps.forEach(() => this.stepOpenStates.push(true));
  }

  ngOnInit() {
    this.recipeService.getAllRecipes().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        console.log(this.recipes);
      }
    );
  }

  createRecipe() {
    this.recipeService.createRecipe(this.recipe).subscribe(
      (createdRecipe) => {
        // Handle the response as needed
        console.log('Recipe created:', createdRecipe);

        // Clear the form fields
        this.recipe = {
          name: '',
          description: '',
          submittedBy: '',
          imageUrl: '',
          steps: [],
          ingredient: '',
        };

        // Go back to "All Recipes" section
        this.showAllRecipes = true;
        this.showAddRecipeForm = false;
        this.activeButton = 'allRecipes';

        // Display success alert
        alert('Recipe created successfully!');
      },
      (error) => {
        // Handle error if needed
        console.error('Error creating recipe:', error);
        alert('Error creating recipe. Please try again.');
      }
    );
  }
  addStep(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.recipe.steps.push({ id: 0, recipeId: 0, content: '', imageUrl: '' });
    this.stepOpenStates.push(true); // Open the newly added step by default
  }

  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }
  }

  toggleStep(index: number): void {
    this.stepOpenStates[index] = !this.stepOpenStates[index];
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
