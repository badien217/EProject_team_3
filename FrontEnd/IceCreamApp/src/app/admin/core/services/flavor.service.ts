import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flavor } from 'src/app/interfaces/flavor';

const baseUrl = 'http://localhost:7049/5033/Flavor';

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
}
