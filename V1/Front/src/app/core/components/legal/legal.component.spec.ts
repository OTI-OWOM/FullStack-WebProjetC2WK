import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LegalComponent } from './legal.component';

describe('LegalComponent', () => {
  let component: LegalComponent;
  let fixture: ComponentFixture<LegalComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LegalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LegalComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct header', () => {
    const header = element.querySelector('h1');
    expect(header).toBeTruthy();
    expect(header?.textContent).toContain('Terms and Conditions of Sale for Elite Cars Vault');
  });

  it('should display the correct number of paragraphs', () => {
    const paragraphs = element.querySelectorAll('.legal p');
    expect(paragraphs.length).toBe(9);
  });

  it('should contain specific terms in the first paragraph', () => {
    const firstParagraph = element.querySelector('.legal p');
    expect(firstParagraph?.textContent).toContain('By using our website, Elite Cars Vault, you agree to be bound by the following terms and conditions of sale.');
  });

  it('should contain disclaimer about vehicle ownership in the third paragraph', () => {
    const paragraphs = element.querySelectorAll('.legal p');
    expect(paragraphs[2].textContent).toContain('All vehicles listed on our website are sold by private individuals and not by Elite Cars Vault.');
  });

  it('should warn about responsibility of information verification in the fourth paragraph', () => {
    const paragraphs = element.querySelectorAll('.legal p');
    expect(paragraphs[3].textContent).toContain('It is the responsibility of the buyer to verify all information before making a purchase.');
  });
});
