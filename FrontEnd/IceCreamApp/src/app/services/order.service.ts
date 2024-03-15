import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order';
import { OrderDetail } from '../interfaces/order-detail';

const baseUrl = 'http://localhost:5033/api';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${baseUrl}/Order`);
  }

  getOrderById(id: any): Observable<Order> {
    return this.http.get<Order>(`${baseUrl}/Order/${id}`);
  }

  // Add this method to get orders for a specific date range
  getOrdersForDateRange(startDate: Date, endDate: Date): Observable<Order[]> {
    return this.http.get<Order[]>(`${baseUrl}/Order/GetOrdersForDateRange?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);
  }

  createOrder(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Order`, data);
  }

  updateOrder(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Order/${id}`, data);
  }

  deleteOrder(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/Order/${id}`);
  }

  addOrderDetails(orderDetails: any): Observable<any> {
    return this.http.post(`${baseUrl}/OrderDetails`, orderDetails);
  }

}
