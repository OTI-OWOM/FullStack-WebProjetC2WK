import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFooterComponent } from './home-footer.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeFooterComponent', () => {
    let component: HomeFooterComponent;
    let fixture: ComponentFixture<HomeFooterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ HomeFooterComponent ],
            imports: [ RouterTestingModule ] // Include RouterTestingModule to handle elements with routerLink
        }).compileComponents();

        fixture = TestBed.createComponent(HomeFooterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // Perform initial data binding
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have links with specific texts', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const links = compiled.querySelectorAll('a');
        expect(links[0].textContent).toContain('Sell on Generic');
        expect(links[1].textContent).toContain('Terms and conditions');
        expect(links[2].textContent).toContain('Contact');
        expect(links[3].textContent).toContain('Users');
        expect(links[4].textContent).toContain('Login');
        expect(links[5].textContent).toContain('Account');
    });

    it('should have links pointing to correct routes', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        const userLink = compiled.querySelector('a[routerLink="/users"]');
        const loginLink = compiled.querySelector('a[routerLink="/auth/login"]');
        const accountLink = compiled.querySelector('a[routerLink="/me"]');
        
        expect(userLink).toBeTruthy();
        expect(loginLink).toBeTruthy();
        expect(accountLink).toBeTruthy();
    });
});
