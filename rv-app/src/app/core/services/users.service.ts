import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    private apiUrl = 'http://localhost:8000/users';

    constructor(private http: HttpClient) {}

    getUserById(userId: number): Observable<IUser> {
        return this.http.get<IUser>(`${this.apiUrl}/${userId}/`);
    }
}