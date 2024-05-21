import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DbService } from '../../../services/db.service';

@Component({
    selector: 'app-delete-product',
    templateUrl: './delete-product.component.html',
    styleUrls: ['./delete-product.component.scss'],
})
export class DeleteProductComponent implements OnDestroy {
    private subscription: Subscription = new Subscription();
    message!: string;
    paramID!: string;

    constructor(
        private product_service: DbService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    productDelete(): void {
        this.subscription.add(
            this.product_service
                .deleteProduct(this.paramID)
                .subscribe({
                    next: (res: any) => {
                        if (res) {
                            setTimeout(() => {
                                this.router.navigate(['product']);
                            }, 1000);
                        }
                    },
                    error: (err: any) => {
                        this.message = err.error.message;
                    }
                }),
        );
    }
}
