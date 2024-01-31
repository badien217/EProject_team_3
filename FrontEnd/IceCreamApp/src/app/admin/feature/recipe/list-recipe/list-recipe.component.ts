import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'src/app/interfaces/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-list-recipe',
  templateUrl: './list-recipe.component.html',
  styleUrls: ['./list-recipe.component.css']
})
export class ListRecipeComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  recipes: Recipe[] = [];
  page: number = 1;
  // currentRecipe: Recipe = {};
  currentIndex = -1;
  title = '';

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.retrieveRecipes();
  }

  retrieveRecipes(): void {
    this.recipeService.getAllRecipes().subscribe({
      next: (data) => {
        this.recipes = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
