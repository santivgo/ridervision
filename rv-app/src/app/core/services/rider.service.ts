import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IRider } from '../interfaces/models/rider.interface';

@Injectable({
  providedIn: 'root'
})
export class RiderService {
  private apiUrl = 'http://localhost:8000/riders/'; 

  constructor(private http: HttpClient) {}

  getRider(riderId: number): Observable<IRider> {
      const url = `${this.apiUrl}${riderId}/`;
      return this.http.get<IRider>(url);
  }

  getRidersByShow(serieId:string): Observable<IRider[]>{
    const url = `${this.apiUrl}show/${serieId}/`;
    return this.http.get<IRider[]>(url);
  }

  getAllRiders(): Observable<IRider[]> {
    return this.http.get<IRider[]>(this.apiUrl);
  }
}