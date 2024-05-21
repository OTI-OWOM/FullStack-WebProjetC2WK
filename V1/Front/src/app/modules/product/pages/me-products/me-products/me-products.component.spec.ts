import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MeProductsComponent } from './me-products.component';
import { DbService } from '../../../services/db.service';
import { UsersService } from '@core/services/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { URL } from '@core/constants/url';

describe('MeProductsComponent', () => {
  let component: MeProductsComponent;
  let fixture: ComponentFixture<MeProductsComponent>;
  let dbServiceMock: jasmine.SpyObj<DbService>;
  let usersServiceMock: jasmine.SpyObj<UsersService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    dbServiceMock = jasmine.createSpyObj('DbService', ['getAllProductsFromSelf', 'getAllImages']);
    usersServiceMock = jasmine.createSpyObj('UsersService', ['me']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [MeProductsComponent],
      providers: [
        { provide: DbService, useValue: dbServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '123' } } } },
      ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(MeProductsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    dbServiceMock.getAllProductsFromSelf.and.returnValue(of([
      { id: '1', Year: 2020, Price: 30000, Description: 'A great car', Available: 1, SellerID: '123', ModelBrandName: 'Model A', ModelBrandID: 1, BrandName: 'Brand A', SellerName: 'John', SellerLastName: 'Doe', SellerEmail: 'john.doe@example.com', CarDetails: [] },
    ]));

    dbServiceMock.getAllImages.and.returnValue(of([
      { id: 1, url: 'http://192.168.247.134:3000/car/image/1' },
    ]));

    usersServiceMock.me.and.returnValue(of({ id: '123', Name: 'John' }));
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch all products from self and set images on init', () => {
    expect(dbServiceMock.getAllProductsFromSelf).toHaveBeenCalled();
    expect(component.productList.length).toBe(1);
    expect(component.images['1']).toBe('http://192.168.247.134:3000/car/image/1');
  });

  it('should fetch user information on init', () => {
    expect(usersServiceMock.me).toHaveBeenCalled();
    expect(component.currentUser).toBe('John');
  });

  it('should navigate to user page on back()', () => {
    component.currentUserID = '123';
    component.back();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('user/123');
  });

  afterEach(() => {
    fixture.destroy();
  });
});
