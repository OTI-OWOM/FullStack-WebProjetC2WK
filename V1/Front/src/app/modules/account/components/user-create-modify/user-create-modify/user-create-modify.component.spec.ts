import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserCreateModifyComponent } from './user-create-modify.component';

describe('UserCreateModifyComponent', () => {
  let component: UserCreateModifyComponent;
  let fixture: ComponentFixture<UserCreateModifyComponent>;
  let element: HTMLElement;
  let nameInput: HTMLInputElement;
  let lastNameInput: HTMLInputElement;
  let emailInput: HTMLInputElement;
  let addressInput: HTMLInputElement;
  let cityInput: HTMLInputElement;
  let postalCodeInput: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateModifyComponent],
      imports: [FormsModule]  // Import FormsModule here
    }).compileComponents();

    fixture = TestBed.createComponent(UserCreateModifyComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    // Initialize the component's @Input data
    component.data = {
      Name: 'John',
      LastName: 'Doe',
      Email: 'john.doe@example.com',
      Address: '123 Main St',
      City: 'Anytown',
      PostalCode: '12345',
      Password: 'password123'
    };
    nameInput = element.querySelector('#name') as HTMLInputElement;
    lastNameInput = element.querySelector('#lastName') as HTMLInputElement;
    emailInput = element.querySelector('#email') as HTMLInputElement;
    addressInput = element.querySelector('#Addresss') as HTMLInputElement;
    cityInput = element.querySelector('#city') as HTMLInputElement;
    postalCodeInput = element.querySelector('#postalCode') as HTMLInputElement;
    fixture.detectChanges(); // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input fields to data properties', () => {
    expect(nameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(emailInput.value).toBe('john.doe@example.com');
    expect(addressInput.value).toBe('123 Main St');
    expect(cityInput.value).toBe('Anytown');
    expect(postalCodeInput.value).toBe('12345');

    // Simulate user entering a new name
    nameInput.value = 'Jane';
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.data.Name).toBe('Jane');
  });

  it('should have placeholders set from data properties', () => {
    expect(addressInput.placeholder).toBe('123 Main St');
    expect(nameInput.placeholder).toBe('John'); 
    expect(lastNameInput.placeholder).toBe('Doe'); 
    expect(emailInput.placeholder).toBe('john.doe@example.com'); 
    expect(cityInput.placeholder).toBe('Anytown'); 
    expect(postalCodeInput.placeholder).toBe('12345'); 
  });
});
