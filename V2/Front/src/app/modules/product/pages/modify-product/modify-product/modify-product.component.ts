import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';
import { URL } from '@core/constants/url';
import { CreateProductComponent } from '../../create-product/create-product/create-product.component'
import { DbService } from 'src/app/modules/product/services/db.service';
import { ProductService } from '../../../services/product.service';
import { Message } from '@core/models/Message';


@Component({
    selector: 'app-modify-product',
    templateUrl: '../../create-product/create-product/create-product.component.html',
    styleUrls: ['../../create-product/create-product/create-product.component.scss'],
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
        dbService: DbService,
        router: Router,
        productService: ProductService,
        public route: ActivatedRoute,

    ) {
        super(dbService, router, productService);
        this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.title = "Modify product";
        this.createModify = "Modify";
        this.userID = sessionStorage.getItem('userId') ?? '';

        this.route.params.subscribe((params) => { this.paramID = params['id']; });
        
        this.dbService.getProductById(this.paramID)
            .subscribe((response: Product) => {
                this.product = response;
                this.carDetails = this.product.CarDetails;

                this.dbService.getAllImages(this.product.id)
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
            this.selectedImages.splice(index - this.tracker, 1);
        }

        this.imagePreviews.splice(index, 1);
    }

    override submit() {
        this.productService.submitModify(this.data, this.selectedImages, this.carDetails, this.product.id, this.imagesToRemove)
        .then((message: Message) => {
            if (message.ok) {
                this.message = message.Value;
                setTimeout(() => {
                    this.router.navigate([`product/car/${this.product.id}`]);
                }, 1000);
            } else {
                this.message = message.Value;
            }
        });
    }

    override cancel() {
        this.router.navigate([`/product/car/${this.product.id}`])
    }
}
