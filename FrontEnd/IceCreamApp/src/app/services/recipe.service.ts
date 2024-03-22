import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../interfaces/step';
import { Recipe } from '../interfaces/recipe';
import { HttpClient } from '@angular/common/http';
import { RecipeRating } from '../interfaces/recipe-rating';

const baseUrl = 'http://localhost:5033/api';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${baseUrl}/Recipe`);
  }

  getAllShowRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${baseUrl}/Recipe/GetAllShowRecipes`);
  }

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${baseUrl}/Recipe/${id}`);
  }

  createRecipe(data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);

      }
    }

    return this.http.post(`${baseUrl}/Recipe`, formData);
  }

  updateRecipe(id: number, data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.put(`${baseUrl}/Recipe/${id}`, formData);
  }

  updateRecipeStatus(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Recipe/UpdateStatus/${id}`, data);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/Recipe/${id}`);
  }
  getAllRecipeRating(): Observable<RecipeRating[]> {
    return this.http.get<RecipeRating[]>(`${baseUrl}/RecipeRating`);
  }

  getRecipeRatingById(id: number): Observable<RecipeRating[]> {
    return this.http.get<RecipeRating[]>(`${baseUrl}/RecipeRating/${id}`);
  }

  createRecipeRating(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/RecipeRating`, data);
  }

  getAvgRating(id: number): Observable<any> {
    return this.http.get<RecipeRating[]>(`${baseUrl}/RecipeRating/AvgRating/${id}`);
  }
}
