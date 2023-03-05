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

    public getProductById(id: string, token: string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Product>(`${URL.PRODUCT}${id}`, { headers });
    }

    public getAllProductsFromUser(id: string, token: string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Product[]>(`${URL.PRODUCTS}/${id}`, { headers });
    }

    public createProduct(
        token: string,
        userId: string,
        name: string,
        price: string,
        description: string,
    ) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.post(
            URL.PRODUCT_CREATE,
            {
                product: {
                    userId,
                    name,
                    price,
                    description,
                },
            },
            { headers },
        );
    }

    public modifyProduct(
        token: string,
        productId: string,
        name: string,
        price: string,
        description: string,
    ) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.put(
            URL.PRODUCT + productId,
            {
                name,
                price,
                description,
            },
            { headers },
        );
    }

    public deleteProduct(id: string, token: string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.delete(`${URL.PRODUCT}${id}`, { headers });
    }
}
