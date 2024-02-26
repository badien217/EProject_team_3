import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/book';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:8080/api/Book/';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(baseUrl +"GetAllBook");
  }

  getBookById(id: any): Observable<Book> {
    return this.http.get<Book>(`${baseUrl}/${id}`);
  }

  createBook(data: any): Observable<any> {
    return this.http.post(baseUrl+"CreateBook", data);
  }

  updateBook(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteBook(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Book[]> {
    return this.http.get<Book[]>(`${baseUrl}?title=${title}`);
  }
}
