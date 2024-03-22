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

  getFlavorById(id: number): Observable<Flavor> {
    return this.http.get<Flavor>(`${baseUrl}/${id}`);
  }

  createFlavor(data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.post(baseUrl, formData);
  }

  updateFlavor(id: number, data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.patch(`${baseUrl}/${id}`, formData);
  }

  deleteFlavor(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
