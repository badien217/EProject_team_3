import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavor } from '../interfaces/flavor';

const baseUrl = 'http://localhost:5033/api/Flavor';

@Injectable({
  providedIn: 'root'
})
export class FlavorService {

  constructor(private http: HttpClient) { }

  getAllFlavors(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(baseUrl);
  }

  getFlavorById(id: any): Observable<Flavor> {
    return this.http.get<Flavor>(`${baseUrl}/${id}`);
  }

  createFlavor(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateFlavor(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteFlavor(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
