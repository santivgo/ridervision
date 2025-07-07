import { CanActivate, Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
  constructor(
    private readonly _userService: UsersService,
    private router: Router
  ) { }

  canActivate(): boolean {
    this._userService.removeToken();
    this.router.navigate(['/login']);
    window.location.reload(); 

    return false;
  }
  };
