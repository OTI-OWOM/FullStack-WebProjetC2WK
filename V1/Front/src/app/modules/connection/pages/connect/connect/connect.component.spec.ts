import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnectComponent } from './connect.component';
import { AuthService } from '@core/services/auth.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ConnectComponent', () => {
    let component: ConnectComponent;
    let fixture: ComponentFixture<ConnectComponent>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        mockAuthService = jasmine.createSpyObj('AuthService', ['loginUser']);
        mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

        await TestBed.configureTestingModule({
            declarations: [ ConnectComponent ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(ConnectComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to "/product" on successful login', () => {
        const email = "test@example.com";
        const password = "password123";
        mockAuthService.loginUser.and.returnValue(of({userId:"123", role:true, token:"Test"}));
        component.validation(email, password);
        expect(mockAuthService.loginUser).toHaveBeenCalledWith(email, password);
        expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/product');
    });

    it('should set error message on login failure', () => {
        const email = "test@example.com";
        const password = "password123";
        mockAuthService.loginUser.and.returnValue(throwError(() => new Error("Login failed")));
        component.validation(email, password);
        expect(component.message).toEqual("Login or password incorrect.");
    });

    it('should show message if email is missing', () => {
        component.validation('', 'password123');
        expect(component.message).toEqual("You need to provide an Email!");
    });

    it('should show message if password is missing', () => {
        component.validation('test@example.com', '');
        expect(component.message).toEqual("You need to provide a password!");
    });
});
 