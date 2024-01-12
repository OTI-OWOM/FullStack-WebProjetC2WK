/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/interfaces/Users';
import { URL } from '../../../shared/constants/url';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { CarImage } from 'src/app/shared/interfaces/Images';

@Component({
    selector: 'app-user-products',
    templateUrl: './user-products.component.html',
    styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit, OnDestroy {
    productList: Product[] = [];
    resultList:Product[] = [];

    paramID: string = '';

    currentUser: string = '';
    currentUserID: string = '';

    private subscription: Subscription = new Subscription();

    images: any = {};

    constructor(
        private productsService: ProductsService,
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
        this.currentUserID = sessionStorage.getItem('userId') ?? '';
    }

    ngOnInit(): void {
        this.productsService
            .getAllProductsFromUser(
                this.paramID,
                
            )
            .subscribe((response: Product[]) => {
                this.productList = response;
                this.setImages();
            });

        this.subscription.add(
            this.usersService
                .userSelect( this.paramID)
                .subscribe((res: Partial<User>) => {
                    this.currentUser = res.Name ?? '';
                }),
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    back(): void {
        ['user', 'userID'].forEach((value) => sessionStorage.removeItem(value));
        this.router.navigateByUrl(`user/${this.currentUserID}`);
    }

    setImages() {
        for (const product of this.productList) {
            this.productsService.getAllImages(product.id)
            .subscribe((response: CarImage[]) => {
                this.images[product.id] = response.map(image => `${URL.IMAGE}${image.id}`)[0];
            });
        }
    }
}
