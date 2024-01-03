import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../shared/interfaces/Product';
import { URL } from '../shared/constants/url';
import { CarImage } from '../shared/interfaces/Images';
import { CarBrands } from '../shared/interfaces/Brands';
import { CarModelBrands } from '../shared/interfaces/ModelBrands';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    public getAllProducts() {
        return this.http.get<Product[]>(URL.PRODUCTS);
    }

    public getAllModels(id: string) {
        return this.http.get<CarModelBrands[]>(`${URL.MODELS}${id}`);
    }

    public getAllBrands() {
        return this.http.get<CarBrands[]>(URL.BRANDS);
    }

    public getAllImages(id: string) {
        return this.http.get<CarImage[]>(`${URL.IMAGES}${id}`);
    }

    public getProductById(id: string) {
        return this.http.get<Product>(`${URL.PRODUCT}${id}`);
    }

    public getAllProductsFromUser(id: string) {
        return this.http.get<Product[]>(`${URL.PRODUCTS}/${id}`);
    }

    public uploadCarImage(carId: number | null, imageFiles: File[]) {
        const formData = new FormData();
        imageFiles.forEach((file, index) => {
            formData.append(`images`, file);
        });

        return this.http.post(`${URL.IMAGE}${carId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
    }

    public createProduct(
        Year: number,
        Price: number,
        Description: string,
        Available: number,
        ModelBrandID: number | null,
    ) {
        return this.http.post(
            URL.PRODUCT_CREATE,
            {
                Year,
                Price,
                Description,
                Available,
                ModelBrandID,
            },
        );
    }

    public modifyProduct(
        productId: string,
        BrandName: string,
        Price: string,
        Description: string,
    ) {
        return this.http.put(
            URL.PRODUCT + productId,
            {
                BrandName,
                Price,
                Description,
            },
        );
    }

    public deleteProduct(id: string ) {
        return this.http.delete(`${URL.PRODUCT}${id}`);
    }
}
