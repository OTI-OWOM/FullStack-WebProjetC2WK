import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';
import { CarBrands } from 'src/app/shared/interfaces/Brands';
import { CarImage } from 'src/app/shared/interfaces/Images';
import { URL } from '../../../shared/constants/url';

@Component({
    selector: 'app-modify-product',
    templateUrl: './modify-product.component.html',
    styleUrls: ['./modify-product.component.scss'],
})
export class ModifyProductComponent implements OnInit {
    subscription: Subscription = new Subscription();

    product: Product = {} as Product;
    data: Partial<Product> = {} as Product;
    brands: CarBrands[] = [];
    currentBrandId!: number;
    models: CarModelBrands[] = [];
    images: string[] = [];
    currentImageIndex: number = 0;

    userID!: string;
    image!: string;

    selectedImages: File[] = [];
    selectedModelId: number | null = null;
    selectedCarId: number | null = null;

    message!: string;
    paramID!: string;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private productService: ProductsService,
    ) {
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.route.params.subscribe((params) => { this.paramID = params['id']; });
        this.productService.getProductById(this.paramID)
            .subscribe((response: Product) => {
                this.product = response;

                this.productService.getAllImages(this.product.id)
                .subscribe((response: CarImage[]) => {
                    this.images = response.map(image => `${URL.IMAGE}${image.id}`);
                    
                });
                this.subscription.add(this.productService.getAllBrands()
                    .subscribe({
                        next: (res: CarBrands[]) => {
                            this.brands = res;
                            this.currentBrandId = this.brands.find((brand) => brand.BrandName == this.product.BrandName)?.id || 0;
                            this.onBrandChange(this.currentBrandId.toString());
        
                        },
                        error: (err: any) => {
                            this.message = err.error.message;
                        },
                    }))
            });

    }

    onBrandChange(brandId: string): void {
        this.currentBrandId = parseInt(brandId);
        this.subscription.add(this.productService.getAllModels(brandId.toString())
            .subscribe({
                next: (res: CarModelBrands[]) => {
                    this.models = res;
                    this.data.ModelBrandID = this.models[0].id.toString();
                },
                error: (err: any) => {
                    this.message = err.error.message;
                },
            }));
    }

    changeProduct() {
        this.subscription.add(
            this.productService
                // eslint-disable-next-line no-underscore-dangle
                .modifyProduct(this.product.id, this.data)
                .subscribe((res: any) => {
                    if (res) {
                        this.message = res.message;
                        this.router.navigate([`/product/${this.product.id}`])
                    }
                }),
        );
    }

    nextImage() {
        if (this.currentImageIndex < this.images.length - 1) {
            this.currentImageIndex++;
        }
    }

    previousImage() {
        if (this.currentImageIndex > 0) {
            this.currentImageIndex--;
        }
    }
}
