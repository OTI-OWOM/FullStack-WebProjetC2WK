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
    subscription: Subscription = new Subscription();

    userID: string = '';

    data: Partial<User> = {} as User;

    message!: string;

    products: Product[] = [];

    constructor(
        private usersService: UsersService,
        private productService: ProductsService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.subscription.add(
            this.productService
                .getAllProductsFromUser(this.userID )
                .subscribe((res) => {
                    this.products = res;
                }),
        );
        this.subscription.add(
            this.usersService
                .me()
                .subscribe((res) => {
                    this.data = res;
                }),
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    public getProducts(): Product[] {
        return this.products;
    }

    userDelete(): void {
        this.subscription.add(
            this.usersService
                .deleteUser(
                    this.userID,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                        delay(1000);
                        this.router.navigateByUrl('logout');
                    }
                }),
        );
    }

    userModify(Name: string, Email: string, Address: string, Password: string) {
        this.subscription.add(
            this.usersService
                .modifyUser(
                    this.userID,
                    Name,
                    Password,
                    Email,
                    Address,
                )
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                    }
                }),
        );
    }
}
