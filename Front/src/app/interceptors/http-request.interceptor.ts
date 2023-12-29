import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
      // console.log("interceptor: " + req.url);
      const token = sessionStorage.getItem('token') ?? '';
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      req = req.clone({
        headers,
        withCredentials: true
      });
      
      return next.handle(req);
  }
}