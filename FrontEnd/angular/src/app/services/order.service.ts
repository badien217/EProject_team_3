import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:5175/api/Orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(baseUrl);
  }

  getOrderById(id: any): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}/${id}`);
  }

  createOrder(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateOrder(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteOrder(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
