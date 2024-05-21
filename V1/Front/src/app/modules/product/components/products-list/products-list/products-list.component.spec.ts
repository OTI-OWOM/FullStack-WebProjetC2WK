import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { By } from '@angular/platform-browser';
import { Product } from '@core/models/Product';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsListComponent],
      imports: [RouterTestingModule]  // Import RouterTestingModule to handle routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a message when resultList is empty', () => {
    component.resultList = [];
    fixture.detectChanges();
    const messageElement = fixture.debugElement.query(By.css('.products-container div')).nativeElement;
    expect(messageElement.textContent).toContain('It looks like none of our products corresponds to your search.');
  });

  it('should render product cards when resultList is populated', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        Year: 2020,
        Price: 3000000,
        Description: 'A great car',
        Available: 1,
        SellerID: '123',
        ModelBrandName: 'Model S',
        ModelBrandID: 1,
        BrandName: 'Tesla',
        SellerName: 'Elon',
        SellerLastName: 'Musk',
        SellerEmail: 'elon@tesla.com',
        CarDetails: []
      },
      {
        id: '2',
        Year: 2021,
        Price: 4000000,
        Description: 'Another great car',
        Available: 1,
        SellerID: '124',
        ModelBrandName: 'Model 3',
        ModelBrandID: 2,
        BrandName: 'Tesla',
        SellerName: 'Elon',
        SellerLastName: 'Musk',
        SellerEmail: 'elon@tesla.com',
        CarDetails: []
      }
    ];
    component.resultList = mockProducts;
    component.images = {
      '1': 'image1.jpg',
      '2': 'image2.jpg'
    };
    fixture.detectChanges();

    const productCards = fixture.debugElement.queryAll(By.css('.product-card'));
    expect(productCards.length).toBe(2);

    productCards.forEach((card, index) => {
      const product = mockProducts[index];
      const image = card.query(By.css('img')).nativeElement;
      const brandName = card.query(By.css('.product-name')).nativeElement;
      const modelName = card.query(By.css('.product-model')).nativeElement;
      const description = card.query(By.css('.product-description')).nativeElement;
      const price = card.query(By.css('.product-price')).nativeElement;

      expect(image.src).toContain(component.images[product.id]);
      expect(brandName.textContent).toBe(product.BrandName);
      expect(modelName.textContent).toBe(product.ModelBrandName);
      expect(description.textContent).toContain(product.Description);
      expect(price.textContent).toContain((product.Price / 100).toString());
    });
  });

  it('should fallback to default image on error', () => {
    const mockProducts: Product[] = [
      {
        id: '1',
        Year: 2020,
        Price: 3000000,
        Description: 'A great car',
        Available: 1,
        SellerID: '123',
        ModelBrandName: 'Model S',
        ModelBrandID: 1,
        BrandName: 'Tesla',
        SellerName: 'Elon',
        SellerLastName: 'Musk',
        SellerEmail: 'elon@tesla.com',
        CarDetails: []
      }
    ];
    component.resultList = mockProducts;
    component.images = {
      '1': 'non-existent-image.jpg'
    };
    fixture.detectChanges();

    const imageElement = fixture.debugElement.query(By.css('img')).nativeElement;
    imageElement.dispatchEvent(new Event('error'));
    fixture.detectChanges();

    expect(imageElement.src).toContain('assets/images/voiture.png');
  });
});
