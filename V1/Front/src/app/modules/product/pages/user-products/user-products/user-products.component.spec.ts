import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProductsComponent } from './user-products.component';
import { UsersService } from '@core/services/users.service';
import { DbService } from '../../../services/db.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '@core/models/Product';
import { User } from '@core/models/Users';
import { CarImage } from '@core/models/Images';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { URL } from '@core/constants/url';

describe('UserProductsComponent', () => {
    let component: UserProductsComponent;
    let fixture: ComponentFixture<UserProductsComponent>;
    let dbServiceMock: jasmine.SpyObj<DbService>;
    let usersServiceMock: jasmine.SpyObj<UsersService>;
    let routerMock: jasmine.SpyObj<Router>;
    let activatedRouteMock: any;

    beforeEach(async () => {
        dbServiceMock = jasmine.createSpyObj('DbService', ['getAllProductsFromUser', 'getAllImages']);
        usersServiceMock = jasmine.createSpyObj('UsersService', ['userSelect']);
        routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

        activatedRouteMock = {
            params: of({ user: '1' })
        };

        await TestBed.configureTestingModule({
            declarations: [UserProductsComponent],
            imports: [HttpClientTestingModule],
            providers: [
                { provide: DbService, useValue: dbServiceMock },
                { provide: UsersService, useValue: usersServiceMock },
                { provide: Router, useValue: routerMock },
                { provide: ActivatedRoute, useValue: activatedRouteMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        sessionStorage.setItem('userId', '1');  // Set the userId in sessionStorage before component initialization
        fixture = TestBed.createComponent(UserProductsComponent);
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

        dbServiceMock.getAllProductsFromUser.and.returnValue(of(mockProducts));
        dbServiceMock.getAllImages.and.returnValue(of(mockImages));
        usersServiceMock.userSelect.and.returnValue(of({ id: '1', Name: 'John', LastName: 'Doe', Email: 'john.doe@example.com', Role: 'user', Password: '', Address: '', City: '', PostalCode: '', IsSeller: 0, CompanyName: '' }));

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch user products and set images on init', () => {
        expect(dbServiceMock.getAllProductsFromUser).toHaveBeenCalledWith('1');
        expect(component.productList.length).toBe(2);
        expect(dbServiceMock.getAllImages).toHaveBeenCalledTimes(component.productList.length);
        expect(component.images['1']).toBe(`${URL.IMAGE}1`);
    });

    it('should fetch user details on init', () => {
        expect(usersServiceMock.userSelect).toHaveBeenCalledWith('1');
        expect(component.currentUser).toBe('John');
    });

    it('should navigate back to user page on back()', () => {
        component.back();
        expect(routerMock.navigateByUrl).toHaveBeenCalledWith('user/1');
    });

    afterEach(() => {
        component.ngOnDestroy();
    });
});
