import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { Flavor } from '../interfaces/flavor';

const baseUrl = 'http://localhost:5033/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/Product`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/Product/${id}`);
  }

  getAllFlavors(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(`${baseUrl}/Flavor`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/Product`, data);
  }

  updateProduct(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/Product/${id}`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/Product/${id}`);
  }

}
