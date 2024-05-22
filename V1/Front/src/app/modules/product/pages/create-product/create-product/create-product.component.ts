import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from '../../../services/db.service';
import { CarBrands } from '@core/models/Brands';
import { CarModelBrands } from '@core/models/ModelBrands';
import { Router } from '@angular/router';
import { Product } from '@core/models/Product';
import { CarDetail } from '@core/models/Details';
import { ProductService } from '../../../services/product.service';
import { Message } from '@core/models/Message';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.scss'],
})
export class CreateProductComponent implements OnInit, OnDestroy {
    @ViewChild('detailNameInput')
    detailNameInput!: ElementRef;
    protected subscription: Subscription = new Subscription();

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
        protected dbService: DbService,
        protected router: Router,
        protected productService: ProductService
    ) { }


    ngOnInit(): void {
        this.userID = sessionStorage.getItem('userId') ?? '';
        this.data.Available = 1;

        this.subscription.add(this.dbService.getAllBrands()
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
            Array.from(files).forEach(file => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagePreviews.push(e.target?.result);
                };
                reader.readAsDataURL(file);
            });
        } else {
            this.message = "A maximum of 10 images allowed!";
        }
    }

    onBrandChange(brandId: string): void {
        this.subscription.add(this.dbService.getAllModels(brandId)
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



    submit() {
        this.productService.submit(this.data, this.selectedImages, this.carDetails)
            .then((message: Message) => {
                if (message.ok) {
                    this.message = "Car added!"
                    setTimeout(() => {
                        this.router.navigate([`product/car/${message.Value}`]);
                    }, 1000);
                } else {
                    this.message = message.Value;
                }
            });
    }

    cancel() {
        this.router.navigate(['/product'])
    }
}
