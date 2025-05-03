import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/comments'; 
  // aqui é o url do json server
  //json-server --watch db.json --port 3000

  constructor(private http: HttpClient) {}

  getComments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  postComment(comment: {username: string; comment: string}): Observable<any> {
    return this.http.post<any>(this.apiUrl, comment);
  }
}