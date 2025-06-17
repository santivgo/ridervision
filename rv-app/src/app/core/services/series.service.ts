import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IShow } from '../interfaces/models/show.interface';
@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  constructor(private http: HttpClient) {}

  riderList: IShow = {} as IShow;

  private apiUrl = 'http://localhost:8000/shows/'; 


  getShows(): Observable<IShow[]> {
    return this.http.get<IShow[]>(this.apiUrl);
  }


}