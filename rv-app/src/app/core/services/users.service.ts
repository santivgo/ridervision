import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/models/user.interface';
import { IUserRegister } from '../interfaces/auth/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/auth/users'; 

  private userIsLogged: boolean = false
  
  get isLogged(){
    return this.userIsLogged;
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
  
  loginUser(user: {username: string, password: string}): void{
      this.http
      .post<{ access: string; refresh: string }>(
        'http://localhost:8000/auth/jwt/create/',
        user
      )
      .subscribe((resp) => localStorage.setItem('token', resp.access));
  }

}


