import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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

  getDailyRider(): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.get<any>(this.apiUrl + 'daily/', { headers });
  }

  getAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiUrl);
  }

  createPost(postData: FormData): Observable<IPost> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<IPost>(this.apiUrl, postData, { headers });
  }
}
