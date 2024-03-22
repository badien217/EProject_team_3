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

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/Product/${id}`);
  }

  getAllFlavors(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(`${baseUrl}/Flavor`);
  }

  createProduct(data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.post(`${baseUrl}/Product`, formData);
  }

  updateProduct(id: number, data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.put(`${baseUrl}/Product/${id}`, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/Product/${id}`);
  }

}
