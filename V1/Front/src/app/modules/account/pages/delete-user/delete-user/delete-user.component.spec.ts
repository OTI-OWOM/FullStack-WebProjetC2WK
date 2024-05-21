import { ComponentFixture, TestBed, fakeAsync, tick  } from '@angular/core/testing';
import { DeleteUserComponent } from './delete-user.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@core/services/users.service';
import { of } from 'rxjs';

describe('DeleteUserComponent', () => {
    let component: DeleteUserComponent;
    let fixture: ComponentFixture<DeleteUserComponent>;
    let router: Router;
    let usersServiceMock: jasmine.SpyObj<UsersService>;

    beforeEach(async () => {
        usersServiceMock = jasmine.createSpyObj('UsersService', ['deleteUserSelf']);
        const routeMock = { snapshot: { paramMap: { get: () => '123' } } }; 

        await TestBed.configureTestingModule({
            declarations: [DeleteUserComponent],
            imports: [RouterTestingModule],
            providers: [
                { provide: ActivatedRoute, useValue: routeMock },
                { provide: UsersService, useValue: usersServiceMock }
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(DeleteUserComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
        spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set paramID from route parameters', () => {
        expect(component.paramID).toEqual('123');
    });

    it('should navigate on user delete', fakeAsync(() => {
        usersServiceMock.deleteUserSelf.and.returnValue(of({ success: true, message: "Deleted" }));
        component.userDelete();
        expect(usersServiceMock.deleteUserSelf).toHaveBeenCalled();
        tick(1000);
        expect(router.navigate).toHaveBeenCalledWith(['auth/logout']);
    }));
    

    afterEach(() => {
        fixture.destroy();
    });
});
