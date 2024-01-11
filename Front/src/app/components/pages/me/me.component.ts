/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay, Subscription } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces/Product';
import { User } from 'src/app/shared/interfaces/Users';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit, OnDestroy {
    protected subscription: Subscription = new Subscription();

    protected userID: string = '';
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
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }



    userDelete(): void {
        this.router.navigateByUrl(`user/delete/${this.userID}`);
    }

    toggleEditMode(): void {
        this.isEditMode = !this.isEditMode;
    }
    
    createProduct(): void {
        this.router.navigateByUrl('newproduct/create');
    }

    userModify() {
        if (this.isEditMode) {
            this.subscription.add(
                this.usersService
                    .modifyUser(
                        this.userID,
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
