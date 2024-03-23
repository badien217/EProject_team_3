import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../interfaces/faq';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:4200/api/faq';

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
    return this.http.post(`${baseUrl}/${id}`, data);
  }

  deleteFaq(id: any): Observable<any> {
    return this.http.post(`${baseUrl}/${id}`,id);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Faq[]> {
    return this.http.get<Faq[]>(`${baseUrl}?title=${title}`);
  }
}
