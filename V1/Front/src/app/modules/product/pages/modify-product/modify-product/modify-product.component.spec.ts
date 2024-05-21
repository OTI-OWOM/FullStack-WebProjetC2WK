import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModifyProductComponent } from './modify-product.component';
import { DbService } from 'src/app/modules/product/services/db.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Product } from '@core/models/Product';
import { CarImage } from '@core/models/Images';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('ModifyProductComponent', () => {
  let component: ModifyProductComponent;
  let fixture: ComponentFixture<ModifyProductComponent>;
  let dbServiceMock: jasmine.SpyObj<DbService>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let routerMock: jasmine.SpyObj<Router>;
  let routeMock: any;

  beforeEach(async () => {
    dbServiceMock = jasmine.createSpyObj('DbService', ['getProductById', 'getAllImages', 'getAllBrands', 'getAllModels']);
    productServiceMock = jasmine.createSpyObj('ProductService', ['submitModify']);
    routerMock = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    routeMock = {
      params: of({ id: '123' }),
      snapshot: { paramMap: { get: () => '123' } }
    };

    await TestBed.configureTestingModule({
      declarations: [ModifyProductComponent],
      imports: [FormsModule, RouterTestingModule.withRoutes([])],
      providers: [
        { provide: DbService, useValue: dbServiceMock },
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ModifyProductComponent);
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
      CarDetails: [],
    };

    const mockImages: CarImage[] = [
      { id: 1, url: 'http://192.168.247.134:3000/car/image/1' },
    ];

    dbServiceMock.getProductById.and.returnValue(of(mockProduct));
    dbServiceMock.getAllImages.and.returnValue(of(mockImages));
    dbServiceMock.getAllBrands.and.returnValue(of([
      { id: 1, BrandName: 'Brand A' },
      { id: 2, BrandName: 'Brand B' },
    ]));
    dbServiceMock.getAllModels.and.returnValue(of([
      { id: 1, ModelName: 'Model A', BrandID: 1 },
      { id: 2, ModelName: 'Model B', BrandID: 1 },
    ]));
    productServiceMock.submitModify.and.returnValue(Promise.resolve({ Value: 'Product updated successfully!', ok: true }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details and images on init', () => {
    expect(dbServiceMock.getProductById).toHaveBeenCalledWith('123');
    expect(dbServiceMock.getAllImages).toHaveBeenCalledWith('123');
    expect(component.product.id).toBe('123');
    expect(component.imagePreviews.length).toBe(1);
    expect(component.imagePreviews[0]).toBe('http://192.168.247.134:3000/car/image/1');
  });

  it('should remove an image and track it for removal', () => {
    component.removeImage(0);
    expect(component.imagePreviews.length).toBe(0);
    expect(component.imagesToRemove.length).toBe(1);
    expect(component.imagesToRemove[0]).toBe(1);
  });

  it('should submit modified product details and navigate to product page on success', fakeAsync(() => {
    component.submit();
    tick(1000); // simulate async operation
    fixture.detectChanges();
    expect(productServiceMock.submitModify).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['product/car/123']);
  }));

  it('should navigate to product page on cancel', () => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith([`/product/car/123`]);
  });
});
