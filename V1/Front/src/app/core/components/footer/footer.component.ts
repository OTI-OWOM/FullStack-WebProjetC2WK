import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '@core/services/users.service';
import { User } from '@core/models/Users';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy {
    private authSubscription!: Subscription;

    private isAdmin: boolean = false;
    loggedIn = false;

    constructor(private authService: AuthService, private usersService: UsersService) {}

    ngOnInit(): void {
        this.authSubscription = this.authService.isLoggedIn.subscribe(
            status => this.loggedIn = status
        );

        this.usersService.me()
        .subscribe((res: Partial<User>) => {
          this.isAdmin = parseInt(res.Role!) > 0;
        });
    }

    ngOnDestroy(): void {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }

    public get admin() : boolean {
        return this.isAdmin;
    }
}
