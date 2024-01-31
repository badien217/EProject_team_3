import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavor } from '../interfaces/flavor';

const baseUrl = 'http://localhost:5175/api/Flavors';

@Injectable({
  providedIn: 'root'
})
export class FlavorService {

  constructor(private http: HttpClient) {}

  getAllFlavors(): Observable<Flavor[]> {
    return this.http.get<Flavor[]>(baseUrl);
  }

  getFlavorById(id: any): Observable<Flavor> {
    return this.http.get<Flavor>(`${baseUrl}/${id}`);
  }
}
