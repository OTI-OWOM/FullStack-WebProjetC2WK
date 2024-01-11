import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../shared/constants/url';
import { BehaviorSubject, Observable, of, throwError  } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// function isExpired(token: any) {
//     if (token) {
//         console.log(token.exp);
//         const expiry = token.exp;
//         const now = new Date();
//         return expiry;
//     }
//     return false;
// }

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authToken = sessionStorage.getItem('token') ?? '';

    private authStatus = new BehaviorSubject<boolean>(this.hasToken());

    private userId = sessionStorage.getItem('userId') ?? '';

    private isAdmin = false;

    constructor(private http: HttpClient, private router: Router) {}

    get isLoggedIn() {
        return this.authStatus.asObservable();
    }

    private hasToken() {
        return !!this.authToken;
    }

    private updateAuthStatus() {
        this.authStatus.next(this.hasToken());
    }

    isAuthenticated(): Observable<boolean>  {
        if (!this.authToken) {
            this.router.navigate(['/login']);
            return of(false);
        }

        return this.http.get(URL.ME).pipe(
            map(() => true),
            catchError((err) => {
                this.logout();
                this.router.navigate(['/login']);
                return of(false);
            })
        );
    }

    loginUser(Email: string, Password: string) {
        return this.http
            .post<{
            userId: string;
            isAdmin: boolean;
            token: any;
        }>(URL.LOGIN, { Email, Password })
            .pipe(map(response => {
                const { userId, isAdmin, token } = response;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userId', userId); // DELETE ME When UserId becomes obselete

                this.userId = userId;
                this.authToken = token;
                this.isAdmin = isAdmin;

                this.updateAuthStatus();
                return response;
            }),
            catchError(error => {
                // Handle error
                return throwError(() => new Error(error));
            }));
    }

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    
        this.authToken = '';
        this.userId = '';
        this.isAdmin = false;

        this.updateAuthStatus();
        this.router.navigate(['/login']);
    }
}
