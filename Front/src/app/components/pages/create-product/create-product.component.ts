import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
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
export class CreateProductComponent implements OnInit, OnDestroy {
    @ViewChild('detailNameInput') detailNameInput!: ElementRef;
    subscription: Subscription = new Subscription();

    data: Partial<Product> = {};
    currentBrandId!: number;
    title: string = "Create a new product";
    createModify: string = "Create";
    product: Product = {} as Product;
    selectedCarId: number | null = null;

    carDetails: Partial<CarDetail>[] = [];

    selectedImages: File[] = [];
    imagePreviews: string[] = [];

    brands: CarBrands[] = [];
    models: CarModelBrands[] = [];

    userID!: string;
    message!: string;

    constructor(
        protected productService: ProductsService,
        protected router: Router,
    ) {}

    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.data.Available = 1;

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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onImagesSelected(event: Event) {
        const element = event.target as HTMLInputElement;
        let files = element.files;
        if (files && files.length <= 10 && (this.imagePreviews.length + files.length) <= 10) {
          this.selectedImages.push(...Array.from(files));
        //   this.selectedImagesEmit.emit(this.selectedImages);
          Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e: any) => {
              this.imagePreviews.push(e.target.result);
            };
            reader.readAsDataURL(file);
          });
        } else {
        //   this.message.emit("A maximum of 10 images allowed!");
        }
      }

    onBrandChange(brandId: string): void {
        this.subscription.add(this.productService.getAllModels(brandId)
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

    removeImage(index: number): void {
        this.imagePreviews.splice(index, 1);
        this.selectedImages.splice(index, 1);
    }

    async submitCarDetails() {
        if (!this.carDetails) {
            this.carDetails = [];
        }
        console.log(this.selectedCarId);
        
        if (this.selectedCarId && this.carDetails.length > 0) {
            console.log(this.carDetails);
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

    submit() {
        if (this.data.Year && this.data.Price && this.data.Description) {
            this.productService.createProduct(this.data).subscribe({
                next: async (res: any) => {
                    this.message = res.message;
                    this.selectedCarId = parseInt(res.carId);
                    
                    if (this.selectedImages.length > 0) {
                        console.log(this.selectedImages);
                        await this.productService.uploadCarImage(this.selectedCarId, this.selectedImages)
                            .subscribe({
                                error: (err: any) => {
                                    this.message = err.message;
                                }
                            });
                    }
                    await this.submitCarDetails();
                    this.message = 'Product and image added successfully!';
                    setTimeout(() => {
                        this.router.navigate([`product/${this.selectedCarId}`]);
                    }, 1000);
                },
                error: (err: any) => {
                    this.message = err.error.message;
                }
            });
        }
    }

    cancel() {
        this.router.navigate(['/me'])
    }
}
