import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser, IUserRegister } from '../interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'http://localhost:8000/auth/users/'; 

  getUser(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiUrl}/${id}`);
  }

  registerUser(user: IUserRegister): Observable<any>{
    return this.http.post(this.apiUrl, user)
  }

}