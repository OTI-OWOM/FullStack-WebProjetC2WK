import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnDestroy {
    private subscription: Subscription = new Subscription();

    message!: string;

    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}


    validation(Email: string, Password: string): void {
        if (Email && Password) {
            const loginSubscription = this.auth.loginUser(Email, Password).subscribe({
                        next: () => {
                            this.router.navigateByUrl('/products');
                        },
                        error: (err: any) => {
                            this.message = err.error.message;
                        },
                    });
            
            this.subscription.add(loginSubscription);         
        } else {
            this.message = Email ? "You need to provide a password!" : "You need to provide an Email!"
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
