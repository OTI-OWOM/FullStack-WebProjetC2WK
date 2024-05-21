import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { BehaviorSubject } from 'rxjs';
import { of } from 'rxjs';

describe('UserComponent', () => {
    let component: UserComponent;
    let fixture: ComponentFixture<UserComponent>;
    let mockUsersService: jasmine.SpyObj<UsersService>;
    let router: Router;

    beforeEach(async () => {
        mockUsersService = jasmine.createSpyObj('UsersService', ['userSelect']);
        mockUsersService.userSelect.and.returnValue(of({
            Name: 'Test User',
            Role: "1"
        }));

        const routeParams = new BehaviorSubject({ id: '123' });

        await TestBed.configureTestingModule({
            declarations: [UserComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: UsersService, useValue: mockUsersService },
                { provide: ActivatedRoute, useValue: { params: routeParams } }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(UserComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch user data based on route parameters', fakeAsync(() => {
        expect(mockUsersService.userSelect).toHaveBeenCalledWith('123');
        
        // If you need to access protected properties directly for testing:
        const data = component['data'];
        expect(data.Name).toEqual('Test User');
        expect(component['role']).toEqual(false);
    }));

    it('should handle navigation to edit mode', () => {
        component.toggleEditMode();
        expect(component['isEditMode']).toBeTrue();
        component.toggleEditMode();
        expect(component['isEditMode']).toBeFalse();
    });
});
