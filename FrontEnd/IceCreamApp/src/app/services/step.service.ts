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

  getAllSteps(): Observable<Step[]> {
    return this.http.get<Step[]>(baseUrl);
  }

  getStepById(id: any): Observable<Step> {
    return this.http.get<Step>(`${baseUrl}/${id}`);
  }

  createStep(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  updateStep(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  deleteStep(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
