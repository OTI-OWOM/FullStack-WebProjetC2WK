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
        Name: string,
        LastName: string,
        Password: string,
        Email: string,
        Address: string,
        City: string,
        PostalCode: string
    ) {
        if (Name && Password && Email) {
            this.subscription.add(
                this.user_service
                    .registerUser(Name, LastName, Password, Email, Address, City, PostalCode)
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
        } else if (!Email) {
            this.message = 'You have to put an Email';
        } else if (!Password) {
            this.message = 'You have to put a Password';
        } else {
            this.message = 'You have to put a Name';
        }
    }
}
