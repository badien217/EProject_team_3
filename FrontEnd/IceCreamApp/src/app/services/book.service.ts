import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { HttpClient } from '@angular/common/http';
import { BookRating } from '../interfaces/book-rating';

const baseUrl = 'http://localhost:5033/api';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseUrl}/Book`);
  }

  getBookById(id: any): Observable<Book> {
    return this.http.get<Book>(`${baseUrl}/Book/${id}`);
  }

  createBook(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Book`, data);
  }

  updateBook(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Book/${id}`, data);
  }

  deleteBook(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/Book/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${baseUrl}/Book`);
  }

  getAllBookRating(): Observable<BookRating[]> {
    return this.http.get<BookRating[]>(`${baseUrl}/BookRating`);
  }

  getBookRatingById(id: any): Observable<BookRating[]> {
    return this.http.get<BookRating[]>(`${baseUrl}/BookRating/${id}`);
  }

  createBookRating(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/BookRating`, data);
  }

  getAvgRating(id: any): Observable<any> {
    return this.http.get<BookRating[]>(`${baseUrl}/BookRating/AvgRating/${id}`);
  }
}
