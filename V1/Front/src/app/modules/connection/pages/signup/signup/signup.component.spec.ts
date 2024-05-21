import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { UsersService } from '@core/services/users.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let mockUsersService: jasmine.SpyObj<UsersService>;

    beforeEach(async () => {
        mockUsersService = jasmine.createSpyObj('UsersService', ['registerUser']);
        
        await TestBed.configureTestingModule({
            declarations: [ SignupComponent ],
            providers: [
                { provide: UsersService, useValue: mockUsersService }
            ],
            imports: [HttpClientTestingModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should attempt to register a user with valid data', () => {
        const userData = {
            Name: 'John',
            LastName: 'Doe',
            Password: '123456',
            Email: 'john.doe@example.com',
            Address: '123 Main St',
            City: 'Anytown',
            PostalCode: '12345'
        };
        mockUsersService.registerUser.and.returnValue(of({message: "Registration successful"}));

        component.addUser(
            userData.Name, 
            userData.LastName, 
            userData.Password, 
            userData.Email, 
            userData.Address, 
            userData.City, 
            userData.PostalCode
        );

        expect(mockUsersService.registerUser).toHaveBeenCalledWith(
            userData.Name, 
            userData.LastName, 
            userData.Password, 
            userData.Email, 
            userData.Address, 
            userData.City, 
            userData.PostalCode
        );
        expect(component.message).toEqual("Registration successful");
    });

    it('should display an error message if registration fails', () => {
        const errorResponse = { error: { message: "Registration failed" } };
        mockUsersService.registerUser.and.returnValue(throwError(() => errorResponse)); 

        component.addUser('John', 'Doe', '123456', 'john.doe@example.com', '123 Main St', 'Anytown', '12345');
        expect(component.message).toEqual("Registration failed");
    });

    it('should display a message if mandatory fields are missing', () => {
        component.addUser('', '', '', '', '', '', '');
        expect(component.message).toEqual("You have to put an Email");

        component.addUser('John', '', '', 'test@test.fr', '', '', '');
        expect(component.message).toEqual("You have to put a Password");

        component.addUser('John', '', '123456', '', '', '', '');
        expect(component.message).toEqual("You have to put an Email");
    });
});
