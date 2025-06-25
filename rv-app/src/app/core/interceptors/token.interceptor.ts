import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // para não passa token no endpoint publico
  if (req.url.includes('/posts/daily/')) {
    return next(req);
  }
  if (localStorage.getItem('token')) {
    const reqClone = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      ),
    });
    return next(reqClone);
  }
  return next(req);
};
