import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsComponent } from './products.component';
import { DbService } from '../../../services/db.service';
import { of } from 'rxjs';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { URL } from '@core/constants/url';

describe('ProductsComponent', () => {
    let component: ProductsComponent;
    let fixture: ComponentFixture<ProductsComponent>;
    let dbServiceMock: jasmine.SpyObj<DbService>;

    beforeEach(async () => {
        dbServiceMock = jasmine.createSpyObj('DbService', ['getAllProducts', 'getAllImages']);

        await TestBed.configureTestingModule({
            declarations: [ProductsComponent],
            imports: [
                FormsModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: DbService, useValue: dbServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductsComponent);
        component = fixture.componentInstance;
    });

    beforeEach(() => {
        const mockProducts: Product[] = [
            { id: '1', Year: 2020, Price: 30000, Description: 'A great car', Available: 1, SellerID: '1', ModelBrandName: 'Model A', ModelBrandID: 1, BrandName: 'Brand A', SellerName: 'John', SellerLastName: 'Doe', SellerEmail: 'john.doe@example.com', CarDetails: [] },
            { id: '2', Year: 2021, Price: 40000, Description: 'Another great car', Available: 1, SellerID: '2', ModelBrandName: 'Model B', ModelBrandID: 2, BrandName: 'Brand B', SellerName: 'Jane', SellerLastName: 'Doe', SellerEmail: 'jane.doe@example.com', CarDetails: [] }
        ];

        const mockImages: CarImage[] = [
            { id: 1, url: 'http://example.com/image1.jpg' },
            { id: 2, url: 'http://example.com/image2.jpg' }
        ];

        dbServiceMock.getAllProducts.and.returnValue(of(mockProducts));
        dbServiceMock.getAllImages.and.returnValue(of(mockImages));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set a random catch phrase on init', () => {
        const phrases = ['What color is your Bugatti? 😎', 'When Lambo? How about now? 🚀', 'Drive it like you stole it 🚨', 'Just pick one, they all make the same sound 🔔', 'Harder, Better, Fastest, Stronger 🏎️', 'Do you feel the need? 🚦', 'You can\'t handle the thrust 🏁', 'There\'s no place like home, but a McLaren comes close 🏠'];
        expect(phrases).toContain(component.catchPhrase);
    });

    it('should fetch all products on init', () => {
        expect(dbServiceMock.getAllProducts).toHaveBeenCalled();
        expect(component.productList.length).toBe(2);
    });

    it('should set images for each product', () => {
        expect(dbServiceMock.getAllImages).toHaveBeenCalledTimes(component.productList.length);
        expect(component.images['1']).toBe(`${URL.IMAGE}1`);
    });

    it('should sort products by ascending price', () => {
        component.sortByAscendingPrice();
        expect(component.resultList[0].Price).toBeLessThanOrEqual(component.resultList[1].Price);
    });

    it('should sort products by descending price', () => {
        component.sortByDescendingPrice();
        expect(component.resultList[0].Price).toBeGreaterThanOrEqual(component.resultList[1].Price);
    });

    it('should update the result list based on search and price range', () => {
        component.searchString = 'great';
        component.priceRange = 350;
        component.updateResult();
        expect(component.resultList.length).toBe(1);
        expect(component.resultList[0].id).toBe('1');
    });

    it('should calculate the maximum price correctly', () => {
        const maxPrice = component.getMaxPrice();
        expect(maxPrice).toBeCloseTo(500);
    });

    afterEach(() => {
        component.ngOnDestroy();
    });
});
