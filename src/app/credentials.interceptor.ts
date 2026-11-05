import type { HttpInterceptorFn } from '@angular/common/http';

// serve para conseguir levar os cookies da sessão salva, se nao vai dar unauthorized no back
export const credentialsInterceptor: HttpInterceptorFn = (req, next) =>
  next(req.clone({ withCredentials: true }));
