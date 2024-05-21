import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

describe('LogoutComponent', () => {
    let component: LogoutComponent;
    let fixture: ComponentFixture<LogoutComponent>;
    let mockAuthService: jasmine.SpyObj<AuthService>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(async () => {
        // Create spy objects for AuthService and Router
        mockAuthService = jasmine.createSpyObj('AuthService', ['logout']);
        mockRouter = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            declarations: [ LogoutComponent ],
            providers: [
                { provide: AuthService, useValue: mockAuthService },
                { provide: Router, useValue: mockRouter }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LogoutComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call logout on AuthService and navigate to login on init', () => {
        fixture.detectChanges(); // triggers ngOnInit
        expect(mockAuthService.logout).toHaveBeenCalled();
        expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    });
});
