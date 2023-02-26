/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
    subscription: Subscription = new Subscription();

    userID:string = '';

    data: Partial<User> = {} as User;

    message!: string;

    products:Product[] = [];

    constructor(
        private usersService: UsersService,
        private productService: ProductsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userID = localStorage.getItem('userID') ?? '';
        this.subscription.add(
            this.productService
                .getAllProductsFromUser(this.userID, localStorage.getItem('token') ?? '')
                .subscribe((res) => {
                    this.products = res;
                }),
        );
        this.subscription.add(
            this.usersService
                .me(localStorage.getItem('token') ?? '')
                .subscribe((res) => {
                    console.log(`This is a test${res}`);
                    this.data = res;
                }),
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public getProducts():Product[] {
        return this.products;
    }

    userDelete(): void {
        this.subscription.add(
            this.usersService
                .deleteUser(
                    localStorage.getItem('token') ?? '',
                    this.userID,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                    }
                }),
        );
    }

    userModify(username: string, email: string, adresse: string, password: string) {
        console.log(this.userID);
        if (username && email && adresse) {
            this.subscription.add(
                this.usersService
                    .modifyUser(
                        localStorage.getItem('token') ?? '',
                        this.userID,
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
}
