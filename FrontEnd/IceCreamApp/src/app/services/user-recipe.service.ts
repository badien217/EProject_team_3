import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRecipe } from '../interfaces/user-recipe';

const baseUrl = 'http://localhost:5033/api/UserRecipe';

@Injectable({
  providedIn: 'root'
})
export class UserRecipeService {

  constructor(private http: HttpClient) { }

  getAllUserRecipes(): Observable<UserRecipe[]> {
    return this.http.get<UserRecipe[]>(baseUrl);
  }

  getListParticipateUserRecipes(): Observable<UserRecipe[]> {
    return this.http.get<UserRecipe[]>(`${baseUrl}/GetDistinct`);
  }

  getUserRecipeById(id: number): Observable<UserRecipe> {
    return this.http.get<UserRecipe>(`${baseUrl}/${id}`);
  }

  getUserRecipeByUserId(userId: number): Observable<UserRecipe[]> {
    return this.http.get<UserRecipe[]>(`${baseUrl}/user/${userId}`);
  }

  createUserRecipe(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateUserRecipe(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteUserRecipe(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
