import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { UsersService } from '../../../services/users.service';
import { Product } from '../../../shared/interfaces/Product';
import { User } from '../../../shared/interfaces/Users';

@Component({
    selector: 'app-modify-product',
    templateUrl: './modify-product.component.html',
    styleUrls: ['./modify-product.component.scss'],
})
export class ModifyProductComponent implements OnInit {
    product!:Product;

    image!:string;

    subscription: Subscription = new Subscription();

    users_list!: User[];

    message!: string;

    paramID!: string;

    constructor(
        private user_service: UsersService,
        private route: ActivatedRoute,
        private product_service: ProductsService,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    ngOnInit(): void {
        this.subscription.add(this.user_service.getAllUsers()
            .subscribe((res: any) => {
                this.users_list = res.data;
            }));
        this.user_service.getAllUsers().subscribe((response: User[]) => {
            this.users_list = response;
        });

        this.route.params.subscribe((params) => { this.paramID = params['id']; });
        this.product_service.getProductById(this.paramID, localStorage.getItem('token') ?? '')
            .subscribe((response:Product) => {
                this.product = response;
                this.setImage();
            });
    }

    changeProduct(name: string, price: string, description: string) {
        if (name && price && description) {
            this.subscription.add(
                this.product_service
                    // eslint-disable-next-line no-underscore-dangle
                    .modifyProduct(localStorage.getItem('token') ?? '', this.product.id, name, price, description)
                    .subscribe((res: any) => {
                        if (res) {
                            this.message = res.message;
                        }
                    }),
            );
        }
    }

    setImage() {
        // eslint-disable-next-line no-underscore-dangle
        const index = (parseInt(this.product.id, 16) % 25) + 1;
        this.image = `voiture (${index}).jpg`;
    }
}
