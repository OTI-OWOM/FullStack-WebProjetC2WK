import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePageComponent } from './home-page.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomePageComponent', () => {
    let component: HomePageComponent;
    let fixture: ComponentFixture<HomePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HomePageComponent],
            imports: [RouterTestingModule] // Needed for handling routerLink in the templates
        }).compileComponents();

        fixture = TestBed.createComponent(HomePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Perform initial data binding
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a title with interactive glitch effect', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const h2 = compiled.querySelector('h2.hero');
        expect(h2?.textContent).toContain('ELITE CARS VAULT');
        expect(h2?.classList).toContain('glitch');
        expect(h2?.getAttribute('routerLink')).toBe('/product');
    });

    it('should have correct router links', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const links = compiled.querySelectorAll('a[routerLink]');
        
        expect(links[0].getAttribute('routerLink')).toBe('/legal');
        expect(links[1].getAttribute('routerLink')).toBe('/contact');
        expect(links[2].getAttribute('routerLink')).toBe('/users');
        expect(links[3].getAttribute('routerLink')).toBe('/auth/login');
        expect(links[4].getAttribute('routerLink')).toBe('/me');
    });
});
