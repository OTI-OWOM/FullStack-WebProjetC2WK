/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL } from '../shared/constants/url';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(): Observable<boolean> {
        const token = this.authService.getToken();
        if (!token) {
            this.router.navigate(['/login']);
            return of(false);
        }

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token}`,
        });

        return this.http.get(URL.ME, { headers }).pipe(
            map(() => true),
            catchError((err) => {
                this.authService.logout();
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }
}
