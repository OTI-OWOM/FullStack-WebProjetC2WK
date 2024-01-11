import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../services/products.service';
import { CarBrands } from '../../../shared/interfaces/Brands';
import { CarModelBrands } from '../../../shared/interfaces/ModelBrands';
import { Router, ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/shared/interfaces/Images';
import { Product } from 'src/app/shared/interfaces/Product';
import { CarDetail } from 'src/app/shared/interfaces/Details';

@Component({
  selector: 'app-base-product',
  templateUrl: './base-product.component.html',
  styleUrls: ['./base-product.component.scss']
})
export class BaseProductComponent {
  @ViewChild('detailNameInput') detailNameInput!: ElementRef;
  subscription: Subscription = new Subscription();

  product: Product | Partial<Product> = {};
  data: Partial<Product> = {};
  selectedCarId: number | null = null;

  carDetailName: string = '';
  carDetailValue: string = '';
  carDetails: Partial<CarDetail>[] = [];

  selectedImages: File[] = [];
  imagePreviews: string[] = [];
  imagesToRemove: number[] = [];
  existingImages: { id: number, url: string }[] = [];

  brands: CarBrands[] = [];
  currentBrandId!: number;
  models: CarModelBrands[] = [];

  userID!: string;
  message!: string;
  mode: 'create' | 'modify';
  paramID!: string;

  constructor(
    protected productService: ProductsService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    this.mode = this.router.url.includes('create') ? 'create' : 'modify';
  }

  // Placeholder methods
  addProduct() {}
  changeProduct() {}
  loadProductData() {}
  onBrandChange(brandId: string): void {}
  cancel() {}

  ngOnInit(): void {
    this.userID = sessionStorage.getItem('userId') ?? '';
    this.product.Available = this.mode === 'create' ? 1 : undefined;

    this.subscription.add(this.productService.getAllBrands()
      .subscribe({
        next: (res: CarBrands[]) => this.brands = res,
        error: (err: any) => this.message = err.error.message
      }));

    if (this.mode === 'modify') {
      this.paramID = this.route.snapshot.paramMap.get('id') ?? '';
      this.loadProductData();
    }
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
      this.message = "A maximum of 10 images allowed!";
    }
  }

  removeImage(index: number): void {
    const imageToRemove = this.imagePreviews[index];
    const existingImage = this.existingImages.find(image => image.url === imageToRemove);
    if (existingImage) {
      this.imagesToRemove.push(existingImage.id);
    } else {
      const newImageIndex = this.selectedImages.findIndex(image => URL.createObjectURL(image) === imageToRemove);
      if (newImageIndex !== -1) {
        this.selectedImages.splice(newImageIndex, 1);
      }
    }
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

      this.carDetailName = '';
      this.carDetailValue = '';
      this.detailNameInput.nativeElement.focus();
    } else {
      this.message = 'Please fill in all car detail fields.';
    }
  }
}
