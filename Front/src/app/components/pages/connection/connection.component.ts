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


    validation(Email: string, Password: string): void {
        if (Email && Password) {
            this.subscription.add(
                this.user_service
                    .loginUser(Email, Password)
                    .subscribe({
                        next: (res: any) => {
                            localStorage.setItem('token', `${res.token}`);
                            localStorage.setItem('userId', res.userId);
                            this.auth.updateAuthStatus();
                            this.router.navigateByUrl('/products');
                        },
                        error: (err: any) => {
                            this.message = err.error.message;
                        },
                    }),
            );
        }
    }
}
