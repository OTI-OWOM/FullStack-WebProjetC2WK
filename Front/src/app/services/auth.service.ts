import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL } from '../shared/constants/url';

function isExpired(token: any) {
    if (token) {
        const expiry = token.exp;
        const now = new Date();
        return now.getTime() > expiry * 1000;
    }
    return false;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private authToken = localStorage.getItem('token') ?? '';

    private userId = localStorage.getItem('id') ?? '';

    private isAdmin = false;

    constructor(private http: HttpClient, private router: Router) {}

    createUser(
        username: string,
        Email: string,
        Password: string,
        adresse: string,
    ) {
        return this.http.post<{ message: string }>(URL.REGISTER, {
            username,
            Password,
            Email,
            adresse,
        });
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

    isAuthenticated() {
        return this.authToken.length > 0 && !isExpired(this.authToken);
    }

    logout() {
        this.authToken = '';
        this.userId = '';
        this.isAdmin = false;
        this.router.navigate(['login']);
    }
}
