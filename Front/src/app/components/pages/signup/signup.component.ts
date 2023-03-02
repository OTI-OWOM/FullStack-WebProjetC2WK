import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
    subscription: Subscription = new Subscription();

    message!: string;

    constructor(private user_service: UsersService) {}

    addUser(
        username: string,
        password: string,
        email: string,
        adresse: string,
    ) {
        if (username && password && email) {
            this.subscription.add(
                this.user_service
                    .registerUser(username, password, email, adresse)
                    .subscribe({
                        next: (res: any) => {
                            if (res) {
                                this.message = res.message;
                            }
                        },
                        error: (err: any) => {
                            this.message = err.error.message;
                        },
                    }),
            );
        } else if (!email) {
            this.message = 'You have to put an email';
        } else if (!password) {
            this.message = 'You have to put a password';
        } else {
            this.message = 'You have to put a username';
        }
    }
}
