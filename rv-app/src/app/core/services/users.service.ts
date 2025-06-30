import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { IUser } from '../interfaces/models/user.interface';
import { IUserRegister } from '../interfaces/auth/auth.interface';
import { Router } from '@angular/router';
import { IReview } from '../interfaces/models/review.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:8000/auth/users'; 
  
  get isLogged(): boolean{
    return !!localStorage.getItem('token') 
  }

  unlogged(){
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}/`);
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:8000/auth/users/me/');
  }

  getReviewsByUser(): Observable<IReview[]> {
  return this.getCurrentUser().pipe(
    switchMap((user: IUser) => 
      this.http.get<IReview[]>(`http://localhost:8000/reviews/user/${user.id}`)
    )
  );
}

  registerUser(user: IUserRegister): Observable<any>{
    return this.http.post(`${this.apiUrl}/`, user)

  }
  
  loginUser(user: {username: string, password: string}): Observable<{ access: string; refresh: string }>{
      return this.http
      .post<{ access: string; refresh: string }>(
        'http://localhost:8000/auth/jwt/create/',
        user
      );
  }

   saveTokens(tokens: { access: string; refresh: string }): void {
    localStorage.setItem('token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
  }
}


