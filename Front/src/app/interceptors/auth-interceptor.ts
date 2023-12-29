import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // const authToken = this.auth.getToken();
        // const newReq = req.clone({
        //     headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        // });
        // return next.handle(newReq);
        return next.handle(req).pipe(
            catchError((error) => {
                if (error.status === 401) {
                    console.log('Interceptor called');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('userId');
                    this.router.navigate(['/login']).then(() => window.location.reload());
                }
                return throwError(() => error);
            }),
        );
    }
}
