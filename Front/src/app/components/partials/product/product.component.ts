/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
    product:Product = {} as Product;

    image!:string;

    isOwnProduct:boolean = false;

    paramID:string = '';

    subscription: Subscription = new Subscription();

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe((params) => { this.paramID = params['id']; });
        this.productsService.getProductById(this.paramID, localStorage.getItem('token') ?? '')
            .subscribe((response:Product) => {
                this.product = response;
                console.log('local storage : ');
                console.log(localStorage.getItem('userId'));
                console.log(this.product.userId);
                this.isOwnProduct = this.product.userId === localStorage.getItem('userID') ?? '';
                this.setImage();
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setImage() {
        const index = (parseInt(this.product._id, 16) % 25) + 1;
        this.image = `voiture (${index}).jpg`;
    }
}
