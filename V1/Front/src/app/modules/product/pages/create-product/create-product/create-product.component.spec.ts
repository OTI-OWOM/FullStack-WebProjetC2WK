import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CreateProductComponent } from './create-product.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DbService } from '../../../services/db.service';
import { ProductService } from '../../../services/product.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CreateProductComponent', () => {
  let component: CreateProductComponent;
  let fixture: ComponentFixture<CreateProductComponent>;
  let dbServiceMock: jasmine.SpyObj<DbService>;
  let productServiceMock: jasmine.SpyObj<ProductService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dbServiceMock = jasmine.createSpyObj('DbService', ['getAllBrands', 'getAllModels']);
    productServiceMock = jasmine.createSpyObj('ProductService', ['submit']);
    routerMock = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [CreateProductComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: DbService, useValue: dbServiceMock },
        { provide: ProductService, useValue: productServiceMock },
        { provide: Router, useValue: routerMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProductComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    dbServiceMock.getAllBrands.and.returnValue(of([
      { id: 1, BrandName: 'Brand A' },
      { id: 2, BrandName: 'Brand B' },
    ]));

    dbServiceMock.getAllModels.and.returnValue(of([
      { id: 1, ModelName: 'Model A', BrandID: 1 },
      { id: 2, ModelName: 'Model B', BrandID: 1 },
    ]));

    productServiceMock.submit.and.returnValue(Promise.resolve({ Value: '123', ok: true }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with userID from sessionStorage', () => {
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      return key === 'userId' ? '123' : null;
    });
    component.ngOnInit();
    expect(component.userID).toBe('123');
  });

  it('should fetch brands on initialization', () => {
    expect(dbServiceMock.getAllBrands).toHaveBeenCalled();
    expect(component.brands.length).toBe(2);
  });

  it('should fetch models when a brand is selected', () => {
    component.onBrandChange('1');
    expect(dbServiceMock.getAllModels).toHaveBeenCalledWith('1');
    expect(component.models.length).toBe(2);
  });

  it('should display error message when fetching brands fails', () => {
    dbServiceMock.getAllBrands.and.returnValue(throwError(() => ({ error: { message: 'Failed to fetch brands' } })));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.message).toBe('Failed to fetch brands');
  });

  it('should display error message when fetching models fails', () => {
    dbServiceMock.getAllModels.and.returnValue(throwError(() => ({ error: { message: 'Failed to fetch models' } })));
    component.onBrandChange('1');
    fixture.detectChanges();
    expect(component.message).toBe('Failed to fetch models');
  });

  it('should add selected images and preview them', fakeAsync(() => {
    const file = new File([''], 'filename', { type: 'image/jpeg' });
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    const event = new Event('change', { bubbles: true });
    Object.defineProperty(event, 'target', { writable: false, value: { files: dataTransfer.files } });

    spyOn(FileReader.prototype, 'readAsDataURL').and.callFake(function (this: FileReader) {
      const fileReader = this;
      setTimeout(() => {
        const progressEvent = new ProgressEvent('load');
        Object.defineProperty(fileReader, 'result', { value: 'data:image/jpeg;base64,', configurable: true });
        if (fileReader.onload) fileReader.onload(progressEvent as ProgressEvent<FileReader>);
      }, 100);
    });

    component.onImagesSelected(event as any);
    fixture.detectChanges();
    tick(100);

    expect(component.selectedImages.length).toBe(1);
    expect(component.imagePreviews.length).toBe(1);
  }));

  it('should remove an image and update previews', () => {
    component.imagePreviews = ['image1.jpg', 'image2.jpg'];
    component.selectedImages = [new File([], 'image1.jpg'), new File([], 'image2.jpg')];

    component.removeImage(1);
    fixture.detectChanges();

    expect(component.imagePreviews.length).toBe(1);
    expect(component.selectedImages.length).toBe(1);
  });

  it('should submit product details and navigate to the product page on success', fakeAsync(async () => {
    await component.submit();
    tick(1000);
    fixture.detectChanges();

    expect(productServiceMock.submit).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith([`product/car/123`]);
  }));

  it('should display error message on product submission failure', async () => {
    productServiceMock.submit.and.returnValue(Promise.resolve({ Value: 'Submission failed', ok: false }));
    await component.submit();
    fixture.detectChanges();

    expect(component.message).toBe('Submission failed');
  });

  it('should navigate to product list on cancel', () => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/product']);
  });
});
