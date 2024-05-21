import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DbService } from './db.service';
import { URL } from '../../../core/constants/url';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';
import { CarBrands } from '@core/models/Brands';
import { CarModelBrands } from '@core/models/ModelBrands';
import { CarDetail } from '@core/models/Details';

describe('DbService', () => {
    let service: DbService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DbService]
        });
        service = TestBed.inject(DbService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify(); // Verify that no unmatched requests are outstanding.
    });

    // Example test for getProductById
    it('should fetch a product by id', () => {
        const mockProduct: Product = {
            id: '1',
            Year: 2020,
            Price: 30000,
            Description: 'A great car',
            Available: 1,
            SellerID: '12345',
            ModelBrandName: 'Model X',
            ModelBrandID: 1,
            BrandName: 'Tesla',
            SellerName: 'John',
            SellerLastName: 'Doe',
            SellerEmail: 'john.doe@example.com',
            CarDetails: []
        };

        service.getProductById('1').subscribe(product => {
            expect(product).toEqual(mockProduct);
        });

        const req = httpMock.expectOne(`${URL.PRODUCT}1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockProduct);
    });

    it('should create a product', () => {
        const mockProduct: Partial<Product> = {
            Year: 2020,
            Price: 30000,
            Description: 'A new car'
        };
    
        service.createProduct(mockProduct).subscribe(response => {
            expect(response).toEqual({ message: 'Product created' });
        });
    
        const req = httpMock.expectOne(URL.PRODUCT);
        expect(req.request.method).toBe('POST');
        req.flush({ message: 'Product created' });
    });
    
    it('should delete a car image', () => {
        const imageId = 123;
        service.deleteCarImage(imageId).subscribe(response => {
            expect(response).toEqual({ message: 'Image deleted' });
        });
    
        const req = httpMock.expectOne(`${URL.IMAGE}${imageId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush({ message: 'Image deleted' });
    });
    
    it('should get all brands', () => {
        const mockBrands: CarBrands[] = [
            { id: 1, BrandName: 'Tesla' },
            { id: 2, BrandName: 'BMW' }
        ];
    
        service.getAllBrands().subscribe(brands => {
            expect(brands.length).toBe(2);
            expect(brands).toEqual(mockBrands);
        });
    
        const req = httpMock.expectOne(URL.BRANDS);
        expect(req.request.method).toBe('GET');
        req.flush(mockBrands);
    });    
});
