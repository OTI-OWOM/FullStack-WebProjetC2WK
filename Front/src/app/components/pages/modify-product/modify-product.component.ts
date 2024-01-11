import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../shared/interfaces/Product';
import { CarImage } from 'src/app/shared/interfaces/Images';
import { URL } from '../../../shared/constants/url';
import { CreateProductComponent } from '../create-product/create-product.component'
import { ProductsService } from 'src/app/services/products.service';


@Component({
    selector: 'app-modify-product',
    templateUrl: '../create-product/create-product.component.html',
    styleUrls: ['../create-product/create-product.component.scss'],
})
export class ModifyProductComponent extends CreateProductComponent implements OnInit {
    tracker: number | null = null;

    images: string[] = [];
    imagesToRemove: number[] = [];
    existingImages: { id: number, url: string }[] = [];
    image!: string;

    selectedModelId: number | null = null;

    paramID!: string;

    constructor(
        productService: ProductsService,
        router: Router,
        public route: ActivatedRoute,

    ) {
        super(productService, router);
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.title = "Modify product";
        this.createModify = "Modify";
        this.userID = sessionStorage.getItem('userId') ?? '';

        this.route.params.subscribe((params) => { this.paramID = params['id']; });
        this.productService.getProductById(this.paramID)
            .subscribe((response: Product) => {
                this.product = response;
                this.carDetails = this.product.CarDetails;

                this.productService.getAllImages(this.product.id)
                    .subscribe((response: CarImage[]) => {
                        this.existingImages = response.map(image => ({ id: image.id, url: `${URL.IMAGE}${image.id}` }));
                        this.imagePreviews = this.existingImages.map(image => image.url);
                        this.tracker = this.imagePreviews.length;                            
                        this.currentBrandId = this.brands.find((brand) => brand.BrandName == this.product.BrandName)?.id || 0;
                        this.onBrandChange(this.currentBrandId.toString());
                    });
            });
    }

    override removeImage(index: number): void {
        const imageToRemove = this.imagePreviews[index];
        this.tracker = this.imagePreviews.length;
        
        const existingImage = this.existingImages.find(image => image.url === imageToRemove);
        if (existingImage) {
            this.imagesToRemove.push(existingImage.id);
            this.tracker--;
        } else {
            this.selectedImages.splice(index-this.tracker, 1);
        }

        this.imagePreviews.splice(index, 1);
    }

    override submit() {
        this.subscription.add(
            this.productService
                .modifyProduct(this.product.id, this.data)
                .subscribe({
                    next: async (res: any) => {
                        if (this.selectedImages.length > 0) {
                            await this.productService.uploadCarImage(parseInt(this.product.id), this.selectedImages)
                            .subscribe({
                                error: (err: any) => {
                                    this.message = err;
                                }
                            });
                        }

                        for (const imageId of this.imagesToRemove) {
                            await this.productService.deleteCarImage(imageId)
                            .subscribe({
                                error: (err: any) => {
                                    this.message = err;
                                }
                            });
                        }

                        await this.submitCarDetails();
                        this.router.navigate([`/product/${this.product.id}`])
                    },
                    error: (err: any) => {
                        this.message = "Error updating Car!"
                    }
                }),
        );
    }

    override cancel() {
        this.router.navigate([`/product/${this.product.id}`])
    }
}
