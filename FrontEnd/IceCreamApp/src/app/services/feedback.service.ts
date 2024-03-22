import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../interfaces/feedback';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5033/api/Feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(baseUrl);
  }

  createFeedback(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateFeedback(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteFeedback(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
