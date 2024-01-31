import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../../../services/recipe.service';
import { Recipe } from '../../../../interfaces/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

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
