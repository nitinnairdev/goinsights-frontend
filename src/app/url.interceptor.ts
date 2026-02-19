// src/app/url.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  // If we are in DevMode (localhost), do nothing. Proxy.conf.json takes over.
  if (isDevMode()) {
    return next(req);
  }

  // If we are in Production and the URL starts with /api, add the Vercel domain
  if (req.url.startsWith('/api')) {
    const baseUrl = 'https://goinsights-frontend.vercel.app';
    const apiReq = req.clone({
      url: `${baseUrl}${req.url}`,
    });
    return next(apiReq);
  }

  return next(req);
};
