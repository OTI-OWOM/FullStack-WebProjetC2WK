import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { MeComponent } from './me.component';
import { UsersService } from '@core/services/users.service';
import { of } from 'rxjs';

describe('MeComponent', () => {
    let component: MeComponent;
    let fixture: ComponentFixture<MeComponent>;
    let usersServiceMock: jasmine.SpyObj<UsersService>;
    let router: Router;

    beforeEach(async () => {
        usersServiceMock = jasmine.createSpyObj('UsersService', ['me', 'modifyUserSelf']);
        usersServiceMock.me.and.returnValue(of({ IsSeller: 1, Role: "1" }));

        await TestBed.configureTestingModule({
            declarations: [MeComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: UsersService, useValue: usersServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(MeComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        spyOn(router, 'navigateByUrl').and.stub();  // Stub the navigation
        spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
            if (key === 'userId') return '123';  // Return the expected userID
            return null;
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize and fetch user data successfully', () => {
        // Verifies that the me() method was called on initialization
        expect(usersServiceMock.me).toHaveBeenCalled();
    });

    it('should navigate to delete user route using available methods', () => {
        component.userDelete();
        expect(router.navigateByUrl).toHaveBeenCalledWith(`account/user/delete/123`);
    });

    it('should toggle edit mode', () => {
        component.toggleEditMode();
        expect(component['isEditMode']).toBeTrue();
        component.toggleEditMode();
        expect(component['isEditMode']).toBeFalse();
    });

    it('should update user data and handle response', () => {
        component['data'] = { Name: 'Updated Name' };
        const responseMessage = { message: 'Update successful' };
        usersServiceMock.modifyUserSelf.and.returnValue(of(responseMessage));
        component['isEditMode'] = true;

        component.userModify();
        fixture.detectChanges();

        expect(usersServiceMock.modifyUserSelf).toHaveBeenCalledWith(component['data']);
        expect(component['message']).toEqual('Update successful');
        expect(component['isEditMode']).toBeFalse();
    });
});
