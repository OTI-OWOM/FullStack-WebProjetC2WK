/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { MeComponent } from '../../me/me/me.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent extends MeComponent implements OnInit, OnDestroy {
    protected role: boolean = false;

    constructor(
        usersService: UsersService,
        router: Router,
        public route: ActivatedRoute,
    ) {
        super(usersService, router);
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.userID = params['id'];
            }
        });
    }

    override ngOnInit(): void {
        this.subscription.add(
            this.usersService
                .me()
                .subscribe((res: any) => {
                    this.role = res.Role == 2;
                }),
        );

        this.subscription.add(
            this.usersService
                .userSelect(this.userID)
                .subscribe({
                    next: (res: any) => {
                        this.data = res;
                        this.title = this.data.Name || "Your Account";
                        this.isMe = false;
                        this.isVisitorAllowed = true;
                    }
                }),
        );
    }
}
