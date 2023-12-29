import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../shared/constants/url';
import { BehaviorSubject, Observable, of  } from 'rxjs';
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

    private userId = sessionStorage.getItem('id') ?? '';

    private isAdmin = false;

    constructor(private http: HttpClient, private router: Router) {}

    get isLoggedIn() {
        return this.authStatus.asObservable();
    }

    hasToken() {
        console.log(!!this.authToken);
        return !!this.authToken;
    }

    getToken() {
        return this.authToken;
    }

    updateAuthStatus() {
        this.authStatus.next(this.hasToken());
    }

    loginUser(Email: string, Password: string) {
        return this.http
            .post<{
            userId: string;
            isAdmin: boolean;
            token: any;
        }>(URL.LOGIN, { Email, Password })
            .subscribe((response) => {
                const { userId, isAdmin, token } = response;
                console.log(`userId: ${userId}`);
                console.log(`authToken: ${token}`);
                console.log(`isAdmin: ${isAdmin}`);

                this.userId = userId;
                this.authToken = token;
                this.isAdmin = isAdmin;
            });
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

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('id');
    
        this.authToken = '';
        this.userId = '';
        this.isAdmin = false;
    
        this.router.navigate(['login']);
    }
}
