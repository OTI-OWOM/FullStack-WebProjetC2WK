import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { CarBrands } from '../../../shared/interfaces/Brands';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/interfaces/Product';
import { CarDetail } from 'src/app/shared/interfaces/Details';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit {
    @ViewChild('detailNameInput') detailNameInput!: ElementRef;
    subscription: Subscription = new Subscription();

    product: Partial<Product> = {};
    carDetailName: string = '';
    carDetailValue: string = '';
    carDetails: Partial<CarDetail>[] = [];
    selectedImages: File[] = [];
    imagePreviews: string[] = [];
    selectedCarId: number | null = null;

    brands: CarBrands[] = [];
    models: CarModelBrands[] = [];

    userID!: string;
    message!: string;

    constructor(
        private productService: ProductsService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.product.Available = 1;

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
                        this.product.ModelBrandID = this.models[0].id;
                    } else {
                        this.product.ModelBrandID = null;
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
            console.log(this.selectedImages);
        } else {
            this.message = "A maximum of 10 images allowed!"
        }
    }

    removeImage(index: number): void {
        this.imagePreviews.splice(index, 1);
        this.selectedImages.splice(index, 1);
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
        if (this.selectedCarId && this.carDetails.length > 0) {
            await this.productService.createCarDetail(
                this.selectedCarId, this.carDetails
            ).subscribe({
                next: (res: any) => {
                    this.message = res.message;
                },
                error: (err: any) => {
                    this.message = err.message;
                }
            });

            // Reset CarDetails array after successful submission
            this.carDetails! = [];
        } else {
            this.message = 'Please add at least one car detail.';
        }
    }

    async addProduct() {
        this.product.Price = (this.product.Price, 10) * 100;

        if (this.product.Year && this.product.Price && this.product.Description) {
            await this.productService.createProduct(this.product).subscribe({
                next: async (res: any) => {
                    this.message = res.message;
                    this.selectedCarId = parseInt(res.carId);

                    if (this.selectedImages.length !== 0 && this.selectedCarId) {
                        console.log(this.selectedImages);
                        
                        await this.productService.uploadCarImage(this.selectedCarId, this.selectedImages)
                        .subscribe({
                            next: async (res: any) => {
                                await this.submitCarDetails();
                                this.message = 'Product and image added successfully!';
                                delay(5000);
                                this.router.navigate([`product/${this.selectedCarId}`])
                            },
                            error: (err: any) => {
                                this.message = err.message;
                            }
                        });
                    }
                },
                error: (err: any) => {
                    this.message = err.error.message;
                    console.log(err);
                }
            });
        }
    }
}
