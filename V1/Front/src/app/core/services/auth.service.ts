import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../constants/url';
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
    public userId = sessionStorage.getItem('userId') ?? '';
    public role = false;

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
            this.router.navigate(['/auth/login']);
            return of(false);
        }

        return this.http.get(URL.ME).pipe(
            map(() => true),
            catchError((err) => {
                this.logout();
                this.router.navigate(['/auth/login']);
                return of(false);
            })
        );
    }

    isAdmin(): Observable<boolean>  {
        return this.http.get(URL.IS_ADMIN).pipe(
            map(() => true),
            catchError((err) => {
                this.router.navigate(['/product']);
                return of(false);
            })
        );
    }

    isSeller(): Observable<boolean>  {
        return this.http.get(URL.IS_ADMIN).pipe(
            map(() => true),
            catchError((err) => {
                this.router.navigate(['/product']);
                return of(false);
            })
        );
    }

    loginUser(Email: string, Password: string) {
        return this.http
            .post<{
            userId: string;
            role: boolean;
            token: any;
        }>(URL.LOGIN, { Email, Password })
            .pipe(map(response => {
                const { userId, role, token } = response;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userId', userId); // DELETE ME When UserId becomes obselete

                this.userId = userId;
                this.authToken = token;
                this.role = role;

                this.updateAuthStatus();
                return response;
            }),
            catchError(error => {
                // Handle error
                return throwError(() => error);
            }));
    }
    
    public registerUser(
        Name: string,
        LastName: string,
        Password: string,
        Email: string,
        Address: string,
        City: string,
        PostalCode: string,
    ) {
        return this.http.post<{
            message: string;
            userId: string;
            token: any;
        }>(URL.REGISTER, {
            Name,
            LastName,
            Password,
            Email,
            Address,
            City,
            PostalCode,
        })            
        .pipe(map(response => {
            const { message, userId, token } = response;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId); // DELETE ME When UserId becomes obselete

            this.userId = userId;
            this.authToken = token;

            this.updateAuthStatus();
            return response;
        }),
        catchError(error => {
            // Handle error
            return throwError(() => error);
        }));
    }

    logout() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userId');
    
        this.authToken = '';
        this.userId = '';
        this.role = false;

        this.updateAuthStatus();
        this.router.navigate(['/auth/login']);
    }
}
