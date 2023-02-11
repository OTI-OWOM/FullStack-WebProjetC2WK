import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';

@Component({
    selector: 'app-user-products',
    templateUrl: './user-products.component.html',
    styleUrls: ['./user-products.component.scss'],
})
export class UserProductsComponent implements OnInit, OnDestroy {
    productList:Product[] = [];

    paramID:string = '';

    currentUser:string = '';

    currentUserID:string = '';

    subscription: Subscription = new Subscription();

    constructor(
        private product_service: ProductsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe((params) => {
            if (params['user']) {
                this.paramID = params['user'];
            }
        });
        this.currentUser = localStorage.getItem('user') ?? '';
        this.currentUserID = localStorage.getItem('userID') ?? '';
    }

    ngOnInit(): void {
        console.log(this.paramID);
        this.subscription.add(this.product_service.getAllProductsFromUser(this.paramID, localStorage.getItem('token') ?? '')
            .subscribe((res:any) => {
                this.productList = res.data;
            }));
        this.product_service.getAllProductsFromUser(this.paramID, localStorage.getItem('token') ?? '')
            .subscribe((response:Product[]) => {
                this.productList = response;
            });
    }

    back(): void {
        ['user', 'userID'].forEach((value) => localStorage.removeItem(value));
        this.router.navigateByUrl(`user/${this.currentUserID}`);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
