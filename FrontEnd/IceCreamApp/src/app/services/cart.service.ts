import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../interfaces/cart';
import { CartDetail } from '../interfaces/cart-detail';

const baseUrl = 'http://localhost:5033/api';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDetailTotalSubject: Subject<number> = new Subject<number>();
  cartDetailTotal$: Observable<number> = this.cartDetailTotalSubject.asObservable();

  constructor(private http: HttpClient) { }

  updateCartDetailTotal(total: number): void {
    this.cartDetailTotalSubject.next(total);
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${baseUrl}/Cart`);
  }

  getCartById(id: any): Observable<Cart> {
    return this.http.get<Cart>(`${baseUrl}/Cart/${id}`);
  }

  getLatestCartByUserId(userId: any): Observable<Cart> {
    return this.http.get<Cart>(`${baseUrl}/Cart/user/${userId}`);
  }

  createCart(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Cart`, data);
  }

  createCartDetail(data: CartDetail): Observable<any> {
    return this.http.post(`${baseUrl}/CartDetail`, data);
  }

  updateCartDetail(cartDetailId: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/CartDetail/${cartDetailId}`, data);
  }

  deleteCartDetail(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/CartDetail/${id}`);
  }

}
