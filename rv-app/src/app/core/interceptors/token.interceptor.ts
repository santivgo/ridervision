import { HttpInterceptorFn } from '@angular/common/http';

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

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (isPublicEndpoint(req.url, req.method)) {
    return next(req);
  }
  const token = localStorage.getItem('token');
  if (token) {
    const reqClone = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(reqClone);
  }
  return next(req);
};