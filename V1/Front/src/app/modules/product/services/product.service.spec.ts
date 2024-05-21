import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ProductService', () => {
    let service: ProductService;
    let mockDbService: jasmine.SpyObj<DbService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(() => {
        mockDbService = jasmine.createSpyObj('DbService', ['createProduct', 'createCarDetail', 'uploadCarImage', 'modifyProduct', 'deleteCarImage']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                ProductService,
                { provide: DbService, useValue: mockDbService },
                { provide: Router, useValue: mockRouter }
            ]
        });

        service = TestBed.inject(ProductService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return an error message if required data is missing', async () => {
        const result = await service.submit({ Description: 'A great car' }, [], []);
        expect(result.ok).toBeFalse();
        expect(result.Value).toEqual('Required data is missing');
    });

    it('should successfully create a product and return carId', async () => {
        mockDbService.createProduct.and.returnValue(of({ message: 'Product created', carId: '123' }));
        mockDbService.uploadCarImage.and.returnValue(of({}));
        mockDbService.createCarDetail.and.returnValue(of({ message: 'Details added' }));

        // Passing correct structure for carDetails
        const carDetails = [
            {
                id: 1,
                DetailName: 'Color',
                DetailValue: 'Red'
            }
        ];

        const result = await service.submit(
            { Year: 2020, Price: 30000, Description: 'A great car' },
            [new File([], 'car.jpg')],
            carDetails
        );

        // Assertions to check if the methods were called and the result is as expected
        expect(mockDbService.createProduct).toHaveBeenCalled();
        expect(mockDbService.uploadCarImage).toHaveBeenCalled();
        expect(mockDbService.createCarDetail).toHaveBeenCalled();
        expect(result.ok).toBeTrue();
        expect(result.Value).toEqual('123');
    });

    it('should handle error when product creation fails', async () => {
        mockDbService.createProduct.and.returnValue(throwError(() => new Error('Failed to create product')));

        const result = await service.submit({ Year: 2020, Price: 30000, Description: 'A great car' }, [], []);

        expect(result.ok).toBeFalse();
        expect(result.Value).toEqual('An unknown error occurred');
    });

    it('should modify product and handle images correctly', async () => {
        mockDbService.modifyProduct.and.returnValue(of({ message: 'Product modified' }));
        mockDbService.uploadCarImage.and.returnValue(of({}));
        mockDbService.deleteCarImage.and.returnValue(of({}));

        const result = await service.submitModify({ Year: 2020 }, [new File([], 'newCar.jpg')], [], '123', [1]);

        expect(mockDbService.modifyProduct).toHaveBeenCalled();
        expect(mockDbService.uploadCarImage).toHaveBeenCalled();
        expect(mockDbService.deleteCarImage).toHaveBeenCalled();
        expect(result.ok).toBeTrue();
        expect(result.Value).toEqual('Product modified');
    });
});

