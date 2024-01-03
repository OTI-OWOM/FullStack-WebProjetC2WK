import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { CarBrands } from '../../../shared/interfaces/Brands';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';
import { CreateProductResponse } from '../../../shared/interfaces/CreateProductRes';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
    subscription: Subscription = new Subscription();

    selectedImages: File[] = [];

    selectedModelId: number | null = null; 
    
    selectedCarId: number | null = null; 
    
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

    onImagesSelected(event: Event) {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length <= 10) {
            this.selectedImages = Array.from(files);
        } else {
            // Handle error: more than 10 files
        }
    }

    async addProduct(
        Year: string,
        Price: string,
        Description: string,
        ModelBrandID: number | null
    ) {

        Price = `${parseInt(Price, 10) * 100}`;
        
        if (Year && Price && Description) {
            try {
                const productRes = await this.productService.createProduct(
                    parseInt(Year),
                    parseInt(Price),
                    Description,
                    1, // Assuming 1 represents 'Available'
                    ModelBrandID,
                ).toPromise() as CreateProductResponse;
    
                this.message = productRes.message;
                this.selectedCarId = parseInt(productRes.carId);
    
                // If there's an image selected, upload it after the product is created
                if (this.selectedImages && this.selectedCarId) {
                    await this.productService.uploadCarImage(this.selectedCarId, this.selectedImages).toPromise();
                    this.message = 'Product and image added successfully!';
                }
            } catch (err: any) {
                this.message = err.error.message;
            }
        }
    }
}
