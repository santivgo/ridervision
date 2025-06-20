import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IComment } from '../interfaces/models/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8000/comments/'; 

  constructor(private http: HttpClient) {}

  getCommentsByUser(userId: number): Observable<IComment[]> {
    const params = new HttpParams().set('author', userId.toString());
    return this.http.get<IComment[]>(this.apiUrl, { params })
  }

  getPostComments(postId: number): Observable<IComment[]> {
    const params = new HttpParams().set('post', postId.toString());
    return this.http.get<IComment[]>(this.apiUrl, { params });
  }
}