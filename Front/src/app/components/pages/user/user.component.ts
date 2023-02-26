/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../shared/interfaces/Users';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
    subscription: Subscription = new Subscription();

    targetUser = {} as Partial<User>;

    isVisitorAllowed = false;

    paramID!: string;

    message!: string;

    constructor(
        private usersService: UsersService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe((params) => {
            if (params['id']) {
                this.paramID = params['id'];
            }
        });
    }

    ngOnInit(): void {
        this.subscription.add(
            this.usersService
                .userSelect(localStorage.getItem('token') ?? '', this.paramID)
                .subscribe((res) => {
                    this.targetUser = res;
                    this.isVisitorAllowed = true;
                }),
        );
    }

    getProducts(): void {
        localStorage.setItem('user', this.targetUser.username ?? '');
        // eslint-disable-next-line no-underscore-dangle
        localStorage.setItem('userID', this.targetUser._id ?? '');
        this.router.navigateByUrl(`products/${this.paramID}`);
    }

    userDelete(): void {
        this.subscription.add(
            this.usersService
                .deleteUser(
                    localStorage.getItem('token') ?? '',
                    this.paramID,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                    }
                }),
        );
    }

    userModify(username: string, email: string, adresse: string, password: string) {
        console.log(this.paramID);
        if (username && email && adresse) {
            this.subscription.add(
                this.usersService
                    .modifyUser(
                        localStorage.getItem('token') ?? '',
                        this.paramID,
                        username,
                        password,
                        email,
                        adresse,
                    )
                    .subscribe((res: any) => {
                        if (res) {
                            this.message = 'User modified!';
                        }
                    }),
            );
        }
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
