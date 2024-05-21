import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDisplayComponent } from './user-display.component';

describe('UserDisplayComponent', () => {
  let component: UserDisplayComponent;
  let fixture: ComponentFixture<UserDisplayComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDisplayComponent] // Declare the component
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDisplayComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    // Initialize the component's @Input data
    component.data = {
      Name: 'John',
      LastName: 'Doe',
      Email: 'john.doe@example.com',
      Address: '123 Main St',
      City: 'Anytown',
      PostalCode: '12345'
    };

    // Apply the initial data bindings
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name correctly', () => {
    const nameDisplay = element.querySelector('.display-form');
    expect(nameDisplay?.textContent).toContain('Doe John');
  });

  it('should display user email correctly', () => {
    const emailDisplays = element.querySelectorAll('.display-form');
    expect(emailDisplays[1].textContent).toBe('john.doe@example.com');
  });

  it('should display user address, postal code, and city correctly', () => {
    const addressDisplays = element.querySelectorAll('.display-form');
    expect(addressDisplays[2].textContent).toBe('123 Main St, 12345 Anytown');
  });
});
