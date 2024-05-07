/* eslint-disable no-underscore-dangle */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from '@core/services/users.service';
import { User } from '@core/models/Users';
import { URL } from '@core/constants/url';
import { DbService } from '../../../services/db.service';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';

@Component({
    selector: 'app-user-products',
    templateUrl: './user-products.component.html',
    styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit, OnDestroy {
    protected subscription: Subscription = new Subscription();
    productList: Product[] = [];
    resultList:Product[] = [];

    paramID: string = '';

    currentUser: string = '';
    currentUserID: string = '';


    images: any = {};

    constructor(
        protected productsService: DbService,
        protected route: ActivatedRoute,
        protected usersService: UsersService,
        protected router: Router,
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


            this.usersService.userSelect( this.paramID)
                .subscribe((res: Partial<User>) => {
                    this.currentUser = res.Name ?? 'Test';
                });
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
