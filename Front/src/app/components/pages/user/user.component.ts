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
    isEditMode: boolean = false;
    subscription: Subscription = new Subscription();
    password: string = '';

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
                .userSelect(this.paramID)
                .subscribe((res) => {
                    this.targetUser = res;
                    this.isVisitorAllowed = true;
                }),
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getProducts(): void {
        sessionStorage.setItem('user', this.targetUser.Name ?? '');
        // eslint-disable-next-line no-underscore-dangle
        sessionStorage.setItem('userId', this.targetUser.id ?? '');
        this.router.navigateByUrl(`products/${this.paramID}`);
    }

    userDelete(): void {
        this.subscription.add(
            this.usersService
                .deleteUser(

                    this.paramID,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                    }
                }),
        );
    }

    toggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
    }

    userModify() {
        if (this.isEditMode) {
            console.log(this.targetUser);
            
            this.subscription.add(
                this.usersService
                    .modifyUser(
                        this.paramID,
                        this.targetUser
                    )
                    .subscribe((res: any) => {
                        if (res) {
                            this.message = 'User modified!';
                        }
                    }),
            );
            this.toggleEditMode();
        }
    }
}
