/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';

@Component({
    selector: 'app-user-products',
    templateUrl: './user-products.component.html',
    styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit, OnDestroy {
    productList: Product[] = [];

    paramID: string = '';

    currentUser: string = '';

    currentUserID: string = '';

    subscription: Subscription = new Subscription();

    images: any = {};

    constructor(
        private product_service: ProductsService,
        private route: ActivatedRoute,
        private usersService: UsersService,
        private router: Router,
    ) {
        this.route.params.subscribe((params) => {
            if (params['user']) {
                this.paramID = params['user'];
            }
        });
        this.currentUser = this.paramID;
        this.currentUserID = localStorage.getItem('userID') ?? '';
    }

    ngOnInit(): void {
        this.product_service
            .getAllProductsFromUser(
                this.paramID,
                localStorage.getItem('token') ?? '',
            )
            .subscribe((response: Product[]) => {
                this.productList = response;
                this.sortByAscendingPrice();
                this.setImages();
            });
    }

    back(): void {
        ['user', 'userID'].forEach((value) => localStorage.removeItem(value));
        this.router.navigateByUrl(`user/${this.currentUserID}`);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    sortByAscendingPrice(): void {
        this.productList.sort((a, b) => a.price - b.price);
    }

    setImages() {
        for (const product of this.productList) {
            const index = (parseInt(product._id, 16) % 25) + 1;
            const image = `voiture (${index}).jpg`;
            this.images[product._id] = image;
        }
    }
}
