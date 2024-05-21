import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing'; 

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an anchor tag linking to the contact page', () => {
    const contactLink = element.querySelector('a#account');
    expect(contactLink).toBeTruthy();
    expect(contactLink?.getAttribute('routerLink')).toBe('/contact');
  });

  it('should have a logo image with correct source and alt text', () => {
    const logoImage = element.querySelector('img#logo');
    expect(logoImage).toBeTruthy();
    expect(logoImage?.getAttribute('src')).toContain('assets/images/logo_final.png');
    expect(logoImage?.getAttribute('alt')).toBe('Logo elite cars vault');
  });

  it('should have an anchor tag linking to the user account page', () => {
    const accountLink = element.querySelectorAll('a#account')[1]; // Get the second occurrence
    expect(accountLink).toBeTruthy();
    expect(accountLink.getAttribute('routerLink')).toBe('/account/me');
  });

  it('should display icons correctly', () => {
    const icons = element.querySelectorAll('i.large-icons');
    expect(icons.length).toBe(2); // Expecting two icons
    expect(icons[0].classList).toContain('fa-address-book');
    expect(icons[1].classList).toContain('fa-user');
  });
});
