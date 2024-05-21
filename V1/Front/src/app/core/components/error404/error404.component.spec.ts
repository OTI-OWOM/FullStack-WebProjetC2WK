import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Error404Component } from './error404.component';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error404Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    element = fixture.nativeElement;  // Grab the HTML element of the component
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a 404 error title', () => {
    const title = element.querySelector('h1.forbidden-title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('404');
  });

  it('should display the correct subtitle', () => {
    const subtitle = element.querySelector('h2.forbidden-subtitle');
    expect(subtitle).toBeTruthy();
    expect(subtitle?.textContent).toContain('This page does not exist.');
  });
});
