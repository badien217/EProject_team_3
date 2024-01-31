import { Component } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faMinus, faPlus, faAngleDown, faAngleUp, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../../../services/recipe.service';
import { FormControl } from '@angular/forms';
import { Recipe } from '../../../../interfaces/recipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css',
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
export class AddRecipeComponent {

  faMinus = faMinus;
  faPlus = faPlus;
  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;
  faArrowLeft = faArrowLeft;

  ingredients: string[] = [];
  listIngredientInput = new FormControl('');

  stepOpenStates: boolean[] = [];

  recipe: Recipe = {
    id: 0,
    name: '',
    description: '',
    imageUrl: '',
    submittedBy: '',
    steps: [],
    ingredient: '',
  };

  constructor(private recipeService: RecipeService, private http: HttpClient) {
    this.listIngredientInput.valueChanges.subscribe(value => {
      if (value !== null) {
        this.ingredients = value.split('\n').filter(item => item.trim() !== "");
      }
    });

        this.recipe.steps.forEach(() => this.stepOpenStates.push(true));

  }

  createRecipe() {
    this.recipeService.createRecipe(this.recipe).subscribe((createdRecipe) => {
      // Handle the response as needed
      console.log('Recipe created:', createdRecipe);
    });
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
}

