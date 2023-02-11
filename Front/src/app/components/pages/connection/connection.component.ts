import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent {
    subscription: Subscription = new Subscription();

    message!: string;

    constructor(
        private user_service: UsersService,
        private auth: AuthService,
        private router: Router,
    ) {}

    validation(email: string, password: string): void {
        if (email && password) {
            this.subscription.add(
                this.user_service
                    .loginUser(email, password)
                    .subscribe({
                        next: (res: any) => {
                            this.auth.loginUser(email, password);
                            localStorage.setItem('token', `${res.token}`);
                            localStorage.setItem('id', res.userId);
                            this.router.navigateByUrl('me');
                        },
                        error: (err: any) => {
                            this.message = err.error.message;
                        },
                    }),
            );
        }
    }
}
