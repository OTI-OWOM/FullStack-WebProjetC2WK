import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
    subscription: Subscription = new Subscription();

    userID!: string;

    message!: string;

    constructor(
        private productService: ProductsService,
    ) {}

    ngOnInit(): void {
        this.userID = localStorage.getItem('userId') ?? '';
    }

    addProduct(
        userId: string,
        name: string,
        price: string,
        description: string,
    ) {
        price = `${parseInt(price, 10) * 100}`;
        if (name && price && description) {
            this.subscription.add(
                this.productService
                    .createProduct(
                        localStorage.getItem('token') ?? '',
                        userId,
                        name,
                        price,
                        description,
                    )
                    .subscribe({
                        next: (res: any) => {
                            if (res) {
                                this.message = res.message;
                            }
                        },
                        error: (err: any) => {
                            this.message = err.error.message;
                        },
                    }),
            );
        }
    }
}
