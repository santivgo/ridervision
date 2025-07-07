import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { UsersService } from '../services/users.service';

let ctr = 0;

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const usersService = inject(UsersService);

  const isPublicEndpoint = (url: string, method: string) => {
    if (method === 'GET' && (
      url.match(/\/auth\/users\/?$/) !== null ||
      url.match(/\/auth\/users\/\d+\/?$/) !== null
    )) {
      return true;
    }
    // outros endpoints públicos
    if (url.includes('/posts/daily/')) return true;
    return false;
  };

  const handleAuthError = (err: HttpErrorResponse): Observable<any> => {
    if (err && err.status === 401 && ctr !== 1) {
      ctr++;
      
      return usersService.refreshToken().pipe(
        switchMap((response: any) => {
          console.log('token refreshed!');
          ctr = 0; // Reset counter on success
          
          // Retry the original request with new token
          const newToken = localStorage.getItem('token');
          const retryReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`),
          });
          
          return next(retryReq);
        }),
        catchError((refreshError: any) => {
          console.log('Failed to refresh token');
          usersService.revokeToken();
          ctr = 0; // Reset counter on error
          return throwError(() => refreshError);
        })
      );
    } else {
      ctr = 0;
      return throwError(() => err);
    }
  };

  if (isPublicEndpoint(req.url, req.method)) {
    return next(req);
  }

  const token = localStorage.getItem('token');
  let authReq = req;

  if (token) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  return next(authReq).pipe(
    catchError(handleAuthError)
  );
};