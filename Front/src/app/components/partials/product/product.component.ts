/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { CarImage } from '../../../shared/interfaces/Images';
import { URL } from '../../../shared/constants/url';
import { trigger, transition, query, style, animate, group } from '@angular/animations';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
    animations: [
        trigger('slideAnimation', [
            transition(':increment', group([
                query(':enter', [
                    style({ opacity: 0, transform: 'translateX(100%)' }),
                    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
                ]),
                query(':leave', [
                    animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(-100%)' }))
                ])
            ])),
            transition(':decrement', group([
                query(':enter', [
                    style({ opacity: 0, transform: 'translateX(-100%)' }),
                    animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
                ]),
                query(':leave', [
                    animate('500ms ease-out', style({ opacity: 0, transform: 'translateX(100%)' }))
                ])
            ]))
        ])
    ],
})
export class ProductComponent implements OnInit, OnDestroy {
    product: Product = {} as Product;

    currentImageIndex: number = 0;

    image!: string;

    isOwnProduct: boolean = false;

    isAdmin: boolean = false;

    images: string[] = [];

    imageUrl: string = URL.IMAGE;

    paramID: string = '';

    subscription: Subscription = new Subscription();

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
            this.isOwnProduct = this.product.SellerID.toString() === sessionStorage.getItem('userId') ?? '';
            
            this.setImage();

            this.productsService.getAllImages(this.product.id)
            .subscribe((response: CarImage[]) => {
                this.images = response.map(image => `${URL.IMAGE}${image.id}`);
            });
        });
        
        
        // this.subscription.add(
        //     this.usersService
        //         .me()
        //         .subscribe((res) => {
        //             this.isAdmin = res.Role === 'admin';
        //         }),
        // );
        
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    setImage() {
        const index = (parseInt(this.product.id, 16) % 25) + 1;
        this.image = `voiture (${index}).jpg`;
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
