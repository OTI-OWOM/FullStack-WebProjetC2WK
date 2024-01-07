import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';
import { CarBrands } from 'src/app/shared/interfaces/Brands';

@Component({
    selector: 'app-modify-product',
    templateUrl: './modify-product.component.html',
    styleUrls: ['./modify-product.component.scss'],
})
export class ModifyProductComponent implements OnInit {
    subscription: Subscription = new Subscription();

    product!:Product;
    brands: CarBrands[] = [];
    models: CarModelBrands[] = [];

    userID!: string;
    image!:string;

    selectedImages: File[] = [];
    selectedModelId: number | null = null; 
    selectedCarId: number | null = null; 

    message!: string;
    paramID!: string;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductsService,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.route.params.subscribe((params) => { this.paramID = params['id']; });
        this.productService.getProductById(this.paramID )
            .subscribe((response:Product) => {
                this.product = response;
                this.setImage();
            });

        this.subscription.add(this.productService.getAllBrands()
        .subscribe({
            next: (res: CarBrands[]) => {
                this.brands = res;
            },
            error: (err: any) => {
                this.message = err.error.message;
            },
        }))
    }

    onBrandChange(brandId: string): void {
        this.subscription.add(this.productService.getAllModels(brandId)
            .subscribe({
                next: (res: CarModelBrands[]) => {
                    this.models = res;
                    if (this.models.length > 0) {
                        // Preselect the first model
                        this.selectedModelId = this.models[0].id;
                    } else {
                        this.selectedModelId = null;
                    }
                },
                error: (err: any) => {
                    this.message = err.error.message;
                },
            }));
    }

    changeProduct(ModelBrandID: number | null, price: string, description: string) {
        if (ModelBrandID && price && description) {
            this.subscription.add(
                this.productService
                    // eslint-disable-next-line no-underscore-dangle
                    .modifyProduct(this.product.id, ModelBrandID, price, description)
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
