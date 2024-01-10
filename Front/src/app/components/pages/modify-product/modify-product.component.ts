import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../shared/interfaces/Product';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';
import { CarBrands } from 'src/app/shared/interfaces/Brands';
import { CarImage } from 'src/app/shared/interfaces/Images';
import { URL } from '../../../shared/constants/url';
import { CarDetail } from 'src/app/shared/interfaces/Details';

@Component({
    selector: 'app-modify-product',
    templateUrl: './modify-product.component.html',
    styleUrls: ['./modify-product.component.scss'],
})
export class ModifyProductComponent implements OnInit {
    @ViewChild('detailNameInput') detailNameInput!: ElementRef;
    subscription: Subscription = new Subscription();

    product: Product = {} as Product;
    data: Partial<Product> = {} as Product;
    tracker: number | null = null;

    carDetailName: string = '';
    carDetailValue: string = '';
    carDetails: Partial<CarDetail>[] = [];

    currentBrandId!: number;

    images: string[] = [];
    imagesToRemove: number[] = [];
    existingImages: { id: number, url: string }[] = [];
    selectedImages: File[] = [];
    imagePreviews: string[] = [];

    brands: CarBrands[] = [];
    models: CarModelBrands[] = [];

    userID!: string;
    image!: string;

    selectedModelId: number | null = null;

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
                this.carDetails = this.product.CarDetails;

                this.productService.getAllImages(this.product.id)
                    .subscribe((response: CarImage[]) => {
                        this.existingImages = response.map(image => ({ id: image.id, url: `${URL.IMAGE}${image.id}` }));
                        this.imagePreviews = this.existingImages.map(image => image.url);
                        this.tracker = this.imagePreviews.length;
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
                    if (this.models.length > 0) {
                        this.data.ModelBrandID = this.models[0].id;
                    } else {
                        this.data.ModelBrandID = null;
                    }
                },
                error: (err: any) => {
                    this.message = err.error.message;
                },
            }));
    }

    onImagesSelected(event: Event) {
        const element = event.target as HTMLInputElement;
        let files = element.files;
        if (files && files.length <= 10 && (this.imagePreviews.length + files.length) <= 10) {
            this.selectedImages.push(...Array.from(files));
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        } else {
            this.message = "A maximum of 10 images allowed!"
        }
    }

    removeImage(index: number): void {
        const imageToRemove = this.imagePreviews[index];
        this.tracker = this.imagePreviews.length;
        console.log(`Index : ${index}`);
        
        const existingImage = this.existingImages.find(image => image.url === imageToRemove);
        if (existingImage) {
            this.imagesToRemove.push(existingImage.id);
            this.tracker--;
        } else {
            this.selectedImages.splice(index-this.tracker, 1);
        }

        console.log(this.imagesToRemove);
        this.imagePreviews.splice(index, 1);
    }

    async addCarDetail() {
        if (this.carDetailName && this.carDetailValue) {
            if (!this.carDetails) {
                this.carDetails = [];
            }

            this.carDetails.push({
                DetailName: this.carDetailName,
                DetailValue: this.carDetailValue
            });

            // Reset fields after addition
            this.carDetailName = '';
            this.carDetailValue = '';

            this.detailNameInput.nativeElement.focus();
        } else {
            this.message = 'Please fill in all car detail fields.';
        }
    }

    async submitCarDetails() {
        if (!this.carDetails) {
            this.carDetails = [];
        }

        console.log(this.product.id);
        
        if (this.product.id && this.carDetails.length > 0) {
            console.log(this.carDetails);
            await this.productService.createCarDetail(
                parseInt(this.product.id), this.carDetails
            ).subscribe({
                next: (res: any) => {
                    this.message = res.message;
                },
                error: (err: any) => {
                    this.message = err.message;
                }
            });

            this.carDetails! = [];
        } else {
            this.message = 'Please add at least one car detail.';
        }
    }

    changeProduct() {
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

    cancelModification() {
        this.router.navigate([`/product/${this.product.id}`])
    }
}
