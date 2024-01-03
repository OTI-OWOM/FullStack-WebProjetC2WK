import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { CarBrands } from '../../../shared/interfaces/Brands';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
    subscription: Subscription = new Subscription();

    selectedModelId: number | null = null; 
    
    brands: CarBrands[] = [];

    models: CarModelBrands[] = [];

    userID!: string;

    message!: string;

    constructor(
        private productService: ProductsService,
    ) {}

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';

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

    addProduct(
        Year: string,
        Price: string,
        Description: string,
        ModelBrandID: number | null,
    ) {

        Price = `${parseInt(Price, 10) * 100}`;
        
        if (Year && Price && Description) {
            this.subscription.add(this.productService
                .createProduct(
                        parseInt(Year),
                        parseInt(Price),
                        Description,
                        1,
                        ModelBrandID,
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
