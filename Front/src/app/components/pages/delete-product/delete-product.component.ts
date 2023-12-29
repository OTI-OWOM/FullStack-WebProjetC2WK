import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent {
    subscription: Subscription = new Subscription();

    message!: Object;

    paramID!: string;

    constructor(
        private product_service: ProductsService,
        private route: ActivatedRoute,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    productDelete(): void {
        this.subscription.add(
            this.product_service
                .deleteProduct(this.paramID, sessionStorage.getItem('token') ?? '')
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                    }
                }),
        );
    }
}
