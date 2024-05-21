import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have input for first name with correct placeholder', () => {
    const input = element.querySelector('input[name="fname"]') as HTMLInputElement; 
    expect(input).toBeTruthy();
    expect(input.placeholder).toEqual('Complete this field');
  });

  it('should have radio options for civility', () => {
    const femaleRadio = element.querySelector('#female') as HTMLInputElement; 
    const maleRadio = element.querySelector('#male') as HTMLInputElement; 
    expect(femaleRadio).toBeTruthy();
    expect(femaleRadio.type).toBe('radio');
    expect(maleRadio).toBeTruthy();
    expect(maleRadio.type).toBe('radio');
  });

  it('should validate phone number input to be within range', () => {
    const phoneInput = element.querySelector('input[name="phonenumber"]') as HTMLInputElement; 
    expect(phoneInput).toBeTruthy();
    expect(phoneInput.getAttribute('min')).toBe('1000000000');
    expect(phoneInput.getAttribute('max')).toBe('9999999999');
  });

  it('should enable submission of the form', () => {
    const submitButton = element.querySelector('input[type="submit"]') as HTMLInputElement; 
    expect(submitButton).toBeTruthy();
    expect(submitButton.value).toBe('Send it');
  });

  it('should include a textarea for content message', () => {
    const textarea = element.querySelector('textarea[name="content"]') as HTMLTextAreaElement; 
    expect(textarea).toBeTruthy();
    expect(textarea.placeholder).toBe('Complete this field');
  });
});
