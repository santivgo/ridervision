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

  getCommentsByPost(postId: number): Observable<IComment[]> {
    const url = `${this.apiUrl}por-post/${postId}/`;
    return this.http.get<IComment[]>(url);
  }

  createComment(comment: { post: number; content: string; date: string; author: number }): Observable<IComment> {
    return this.http.post<IComment>(this.apiUrl, comment);
  }

  addCommentToPost(postId: number, content: string): Observable<IComment> {
    // Aqui, o author e date deveriam ser preenchidos corretamente no backend ou frontend
    // Para exemplo, vamos enviar apenas post e content
    return this.http.post<IComment>(this.apiUrl, { post: postId, content });
  }
}