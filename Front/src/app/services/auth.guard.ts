/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { URL } from '../shared/constants/url';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    private isAuthenticated = true;

    subscription: Subscription = new Subscription();

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private usersService: UsersService,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): boolean | Promise<boolean> {
        const headers = new HttpHeaders({
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        });
        this.http.get(URL.ME, { headers }).subscribe({
            error: (err: any) => {
                localStorage.removeItem('token');
                localStorage.removeItem('userId');
                this.isAuthenticated = false;
                this.router.navigate(['/login']).then(() => window.location.reload());
            },
        });
        this.isAuthenticated = this.authService.isAuthenticated();
        return this.isAuthenticated;
    }
}
