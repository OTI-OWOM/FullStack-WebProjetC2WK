/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { CarImage } from '../../../shared/interfaces/Images';
import { URL } from '../../../shared/constants/url';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
    product: Product = {} as Product;

    currentImageIndex: number = 0;
    currentModelsLength: number = 0;

    image!: string;

    isOwnProduct: boolean = false;

    isAdmin: boolean = false;

    images: string[] = [];

    paramID: string = '';

    private subscription: Subscription = new Subscription();

    constructor(
        private productsService: ProductsService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.paramID = params['id'];
        });
        this.productsService
        .getProductById(this.paramID )
        .subscribe((response: Product) => {
            this.product = response;
            this.currentModelsLength = this.product.CarDetails.length;
            
            this.isOwnProduct = this.product.SellerID.toString() === sessionStorage.getItem('userId') ?? '';

            this.productsService.getAllImages(this.product.id)
            .subscribe((response: CarImage[]) => {
                this.images = response.map(image => `${URL.IMAGE}${image.id}`);
            });
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    nextImage() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex++;
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        }
    }
}
