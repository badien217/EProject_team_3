import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';
import { Flavor } from '../interfaces/flavor';
import { HttpClient } from '@angular/common/http';

const baseUrl = 'http://localhost:5175/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${baseUrl}/IceCreams`);
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/IceCreams/${id}`);
  }

  getAllFlavors(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(`${baseUrl}/Flavors`);
  }
}
