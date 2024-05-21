import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCarComponent } from './product-car.component';
import { DbService } from '../../../services/db.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { URL } from '@core/constants/url';

describe('ProductCarComponent', () => {
  let component: ProductCarComponent;
  let fixture: ComponentFixture<ProductCarComponent>;
  let dbServiceMock: jasmine.SpyObj<DbService>;
  let routeMock: any;

  beforeEach(async () => {
    dbServiceMock = jasmine.createSpyObj('DbService', ['getProductById', 'getAllImages']);
    routeMock = {
      params: of({ id: '123' }),
      snapshot: { paramMap: { get: () => '123' } }
    };

    await TestBed.configureTestingModule({
      declarations: [ProductCarComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        { provide: DbService, useValue: dbServiceMock },
        { provide: ActivatedRoute, useValue: routeMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCarComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    const mockProduct: Product = {
      id: '123',
      Year: 2020,
      Price: 30000,
      Description: 'A great car',
      Available: 1,
      SellerID: '123',
      ModelBrandName: 'Model A',
      ModelBrandID: 1,
      BrandName: 'Brand A',
      SellerName: 'John',
      SellerLastName: 'Doe',
      SellerEmail: 'john.doe@example.com',
      CarDetails: [
        { id: 1, DetailName: 'Color', DetailValue: 'Red' },
        { id: 2, DetailName: 'Mileage', DetailValue: '12000' }
      ]
    };

    const mockImages: CarImage[] = [
      { id: 1, url: 'http://example.com/image1.jpg' },
      { id: 2, url: 'http://example.com/image2.jpg' }
    ];

    dbServiceMock.getProductById.and.returnValue(of(mockProduct));
    dbServiceMock.getAllImages.and.returnValue(of(mockImages));

    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      return key === 'userId' ? '123' : null;
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details and images on init', () => {
    expect(dbServiceMock.getProductById).toHaveBeenCalledWith('123');
    expect(dbServiceMock.getAllImages).toHaveBeenCalledWith('123');
    expect(component.product.id).toBe('123');
    expect(component.images.length).toBe(2);
    expect(component.images[0]).toBe(`${URL.IMAGE}1`);
  });

  it('should set current image index and display correct image', () => {
    expect(component.currentImageIndex).toBe(0);
    component.nextImage();
    expect(component.currentImageIndex).toBe(1);
    component.previousImage();
    expect(component.currentImageIndex).toBe(0);
  });

  it('should handle image navigation', () => {
    component.currentImageIndex = 0;
    component.nextImage();
    expect(component.currentImageIndex).toBe(1);
    component.nextImage();
    expect(component.currentImageIndex).toBe(1); // should not go beyond last image

    component.previousImage();
    expect(component.currentImageIndex).toBe(0);
    component.previousImage();
    expect(component.currentImageIndex).toBe(0); // should not go below first image
  });

  it('should determine if the product belongs to the current user', () => {
    fixture.detectChanges();
    expect(component.isOwnProduct).toBeTrue();
  });
});
