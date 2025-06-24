import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { UsersService } from "../services/users.service";

import { Injectable } from "@angular/core";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router, private readonly _usersService: UsersService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      const isLoggedIn = this._usersService.isLogged;
      const token = localStorage.getItem('token');

      console.log('🔍 Token no localStorage:', token); // DEBUG
      console.log('🔍 Service isLogged:', isLoggedIn); // DEBUG
    if (this._usersService.isLogged) {
      return true;
    }
    this.router.navigate(["login"]);
    return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(next, state);
  }
}