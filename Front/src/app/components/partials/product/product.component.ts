/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { UsersService } from '../../../services/users.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
    product: Product = {} as Product;

    image!: string;

    isOwnProduct: boolean = false;

    isAdmin: boolean = false;

    paramID: string = '';

    subscription: Subscription = new Subscription();

    constructor(
        private usersService: UsersService,
        private productsService: ProductsService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.paramID = params['id'];
        });
        this.productsService
            .getProductById(this.paramID, sessionStorage.getItem('token') ?? '')
            .subscribe((response: Product) => {
                this.product = response;
                this.isOwnProduct = this.product.SellerID === sessionStorage.getItem('userId') ?? '';
                this.setImage();
            });

        this.subscription.add(
            this.usersService
                .me(sessionStorage.getItem('token') ?? '')
                .subscribe((res) => {
                    this.isAdmin = res.Role === 'admin';
                }),
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setImage() {
        const index = (parseInt(this.product.id, 16) % 25) + 1;
        this.image = `voiture (${index}).jpg`;
    }
}
