import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../shared/interfaces/Product';
import { URL } from '../shared/constants/url';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private http: HttpClient) {}

    public getAllProducts() {
        return this.http.get<Product[]>(URL.PRODUCTS);
    }

    public getProductById(id: string) {
        return this.http.get<Product>(`${URL.PRODUCT}${id}`);
    }

    public getAllProductsFromUser(id: string) {
        return this.http.get<Product[]>(`${URL.PRODUCTS}/${id}`);
    }

    public createProduct(
        sellerId: string,
        BrandName: string,
        Price: string,
        Description: string,
    ) {
        return this.http.post(
            URL.PRODUCT_CREATE,
            {
                product: {
                    sellerId,
                    BrandName,
                    Price,
                    Description,
                },
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
