import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5175/api/Users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  getUserById(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateUser(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
