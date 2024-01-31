import { Injectable } from '@angular/core';
import { Faq } from '../interfaces/faq';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5175/api/CommonQuestions';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {}

  getAllFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(baseUrl);
  }

  getFaqById(id: any): Observable<Faq> {
    return this.http.get<Faq>(`${baseUrl}/${id}`);
  }

  createFaq(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateFaq(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteFaq(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${baseUrl}?title=${title}`);
  }
}
