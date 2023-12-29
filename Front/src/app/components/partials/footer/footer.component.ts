import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit, OnDestroy   {

    loggedIn = false;
    private authSubscription!: Subscription;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authSubscription = this.authService.isLoggedIn.subscribe(
            status => this.loggedIn = status
        );
    }

    ngOnDestroy(): void {
        this.authSubscription.unsubscribe();
    }
}
