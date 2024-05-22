import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
    private subscription: Subscription = new Subscription();
    message!: string;

        
        constructor(private auth_service: AuthService, protected router: Router) {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    
    addUser(
        Name: string,
        LastName: string,
        Password: string,
        ConfirmPassword: string,
        Email: string,
        Address: string,
        City: string,
        PostalCode: string
    ) {
        if (Name && Password && Email && Password == ConfirmPassword) {
            this.subscription.add(
                this.auth_service
                    .registerUser(Name, LastName, Password, Email, Address, City, PostalCode)
                    .subscribe({
                        next: (res: any) => {
                            if (res) {
                                this.message = res.message;
                                sessionStorage.setItem('token', res.token);
                            }
                            setTimeout(() => {
                                this.router.navigateByUrl('/product')
                            }, 1000)
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
        } else if (Password != ConfirmPassword) {
            this.message = 'Passwords do not match!';
        } else {
            this.message = 'You have to put a Name';
        }
    }
}
