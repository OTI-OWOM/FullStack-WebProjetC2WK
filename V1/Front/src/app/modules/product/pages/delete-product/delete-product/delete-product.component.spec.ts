import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteProductComponent } from './delete-product.component';
import { DbService } from '../../../services/db.service';
import { Router, ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeleteProductComponent', () => {
  let component: DeleteProductComponent;
  let fixture: ComponentFixture<DeleteProductComponent>;
  let dbServiceMock: jasmine.SpyObj<DbService>;
  let routerMock: jasmine.SpyObj<Router>;
  let routeMock: any;

  beforeEach(async () => {
    dbServiceMock = jasmine.createSpyObj('DbService', ['deleteProduct']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    routeMock = { snapshot: { paramMap: { get: jasmine.createSpy().and.returnValue('123') } } };

    await TestBed.configureTestingModule({
      declarations: [DeleteProductComponent],
      providers: [
        { provide: DbService, useValue: dbServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set paramID from route parameters', () => {
    expect(component.paramID).toBe('123');
  });

  it('should navigate to product list on successful deletion', () => {
    dbServiceMock.deleteProduct.and.returnValue(of({ message: 'Product deleted successfully' }));

    component.productDelete();
    expect(dbServiceMock.deleteProduct).toHaveBeenCalledWith('123');
    setTimeout(() => {
      expect(routerMock.navigate).toHaveBeenCalledWith(['product']);
    }, 1000);
  });

  it('should set error message on deletion failure', () => {
    const errorMessage = 'Deletion failed';
    dbServiceMock.deleteProduct.and.returnValue(throwError(() => ({ error: { message: errorMessage } })));

    component.productDelete();
    expect(dbServiceMock.deleteProduct).toHaveBeenCalledWith('123');
    expect(component.message).toBe(errorMessage);
  });

  afterEach(() => {
    fixture.destroy();
  });
});
