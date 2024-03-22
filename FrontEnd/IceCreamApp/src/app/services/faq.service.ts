import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../interfaces/faq';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5033/api/Faq';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) { }

  getAllFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(baseUrl);
  }

  getFaqById(id: number): Observable<Faq> {
    return this.http.get<Faq>(`${baseUrl}/${id}`);
  }

  createFaq(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateFaq(id: number, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteFaq(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
