import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5033/api';

  constructor(private http: HttpClient) { }

  getTotalBooks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Book/Total`);
  }

  getTotalFeedbacks(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Feedback/Total`);
  }

  getTotalRecipes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Recipe/Total`);
  }

  getTotalUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/User/Total`);
  }

  getTotalOrders(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Order/Total`);
  }

  getTotalProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Product/Total`);
  }
}
