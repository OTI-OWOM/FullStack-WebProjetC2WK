import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

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