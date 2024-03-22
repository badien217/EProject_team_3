import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Step } from '../interfaces/step';

const baseUrl = 'http://localhost:5033/api/Step';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  constructor(private http: HttpClient) { }

  getStepsByRecipeId(id: number): Observable<Step[]> {
    return this.http.get<Step[]>(`${baseUrl}/${id}`);
  }

  createStep(data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.post(baseUrl, formData);
  }

  updateStep(id: number, data: any): Observable<any> {
    const formData = new FormData();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }

    return this.http.put(`${baseUrl}/${id}`, formData);
  }

  deleteStep(id: number): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
