import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
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
