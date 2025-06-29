import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/models/user.interface';
import { IUserRegister } from '../interfaces/auth/auth.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  private apiUrl = 'http://localhost:8000/auth/users'; 

  private userIsLogged: boolean = !!localStorage.getItem('token') 
  
  get isLogged(): boolean{
    return this.userIsLogged;
  }

  unlogged(){
    localStorage.removeItem('token');
    this.userIsLogged = false
  }

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}/`);
  }

  getCurrentUser(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:8000/auth/users/me/');
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
    this.userIsLogged = true;
  }
}


