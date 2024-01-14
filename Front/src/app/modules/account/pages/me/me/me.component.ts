/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '@core/models/Users';
import { UsersService } from '@core/services/users.service';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit, OnDestroy {
    protected subscription: Subscription = new Subscription();
    protected role: boolean = false;

    protected userID: string = '';
    protected isSeller: boolean = false;
    protected isVisitorAllowed = false;
    protected data: Partial<User> = {} as User;

    protected title: string = "Your account";
    protected isMe: boolean = true;
    
    isEditMode: boolean = false;
    
    message: string = "";

    constructor(
        protected usersService: UsersService,
        protected router: Router,
    ) {}

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.subscription.add(
            this.usersService
                .me()
                .subscribe((res) => {
                    this.data = res;
                    this.isVisitorAllowed = true;
                }),
        );
        this.usersService.me().subscribe((res:any) => {
                this.isSeller = res.isSeller;
            })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    userDelete(): void {
        this.router.navigateByUrl(`account/user/delete/${this.userID}`);
    }

    toggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
    }
    
    createProduct(): void {
        this.router.navigateByUrl('product/create');
    }

    userModify() {
        if (this.isEditMode) {
            this.subscription.add(
                this.usersService
                    .modifyUserSelf(
                        this.data
                    )
                    .subscribe((res: any) => {
                        if (res) {
                            this.message = res.message;
                        }
                    }),
            );
            this.toggleEditMode();
        }
    }
}
