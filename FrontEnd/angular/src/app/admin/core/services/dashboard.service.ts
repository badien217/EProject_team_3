import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'http://localhost:5175/api';

  constructor(private http: HttpClient) {}

  getTotalBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Books/total`);
  }

  getTotalFeedbacks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Feedbacks/total`);
  }

  getTotalRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Recipes/total`);
  }

  getTotalUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Users/total`);
  }

  getTotalOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Orders/total`);
  }

  getTotalProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/IceCreams/total`);
  }
}
