import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPost } from '../interfaces/models/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8000/posts/'; 

  constructor(private http: HttpClient) {}

  getPostByUser(userId: number): Observable<IPost[]> {
    const params = new HttpParams().set('author', userId.toString());
    return this.http.get<IPost[]>(this.apiUrl, { params })
  }

  getDailyPost(): Observable<IPost[]> {
    const params = new HttpParams().set('day', '1');
    return this.http.get<IPost[]>(this.apiUrl, { params })
  }
}
