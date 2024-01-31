import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../interfaces/step';
import { Recipe } from '../interfaces/recipe';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5175/api/Recipes';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(baseUrl);
  }

  getRecipeById(id: any): Observable<Recipe> {
    return this.http.get<Recipe>(`${baseUrl}/${id}`);
  }

  createRecipe(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateRecipe(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteRecipe(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${baseUrl}?title=${title}`);
  }


  getSteps(recipeId: number): Observable<Step[]> {
    return this.http.get<Step[]>(`${baseUrl}/${recipeId}/Steps`);
  }
  
  addRecipe(recipe: any): Observable<any> {
    return this.http.post(`${baseUrl}`, recipe);
  }

  addStep(step: any): Observable<any> {
    return this.http.post(`http://localhost:5175/api/Steps`, step);
  }

  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`http://localhost:5175/api/Ingredients`, ingredient);
  }
}
