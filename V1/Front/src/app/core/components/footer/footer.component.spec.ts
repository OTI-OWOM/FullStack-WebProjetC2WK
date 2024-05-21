import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { AuthService } from '../../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '@core/services/users.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    const authServiceMock = {
      isLoggedIn: of(true) 
    };
    const usersServiceMock = {
      me: () => of({ Role: '1' }) 
    };

    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [HttpClientModule, RouterTestingModule], 
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UsersService, useValue: usersServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
    element = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Admin link if user is admin', () => {
    const adminLink = element.querySelector('a[routerLink="/admin"]');
    expect(adminLink).toBeTruthy(); 
  });

  it('should display Logout link if user is logged in', () => {
    const logoutLink = element.querySelector('a[routerLink="/auth/logout"]');
    expect(logoutLink).toBeTruthy();
  });

  it('should display Login link if user is not logged in', () => {
    // Re-setup with logged out status
    TestBed.resetTestingModule();
    const authServiceMockLoggedOut = { isLoggedIn: of(false) };
    const usersServiceMockNonAdmin = { me: () => of({ Role: '0' }) };
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMockLoggedOut },
        { provide: UsersService, useValue: usersServiceMockNonAdmin }
      ]
    }).compileComponents();

    const fixtureLoggedOut = TestBed.createComponent(FooterComponent);
    const componentLoggedOut = fixtureLoggedOut.componentInstance;
    fixtureLoggedOut.detectChanges();
    const elementLoggedOut = fixtureLoggedOut.nativeElement;

    const loginLink = elementLoggedOut.querySelector('a[routerLink="/auth/login"]');
    expect(loginLink).toBeTruthy(); 
  });

  it('should not display Admin link if user is not admin', () => {
    
    TestBed.resetTestingModule();
    const authServiceMockLoggedOut = { isLoggedIn: of(true) };
    const usersServiceMockNonAdmin = { me: () => of({ Role: '0' }) };
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceMockLoggedOut },
        { provide: UsersService, useValue: usersServiceMockNonAdmin }
      ]
    }).compileComponents();

    const fixtureNonAdmin = TestBed.createComponent(FooterComponent);
    const componentNonAdmin = fixtureNonAdmin.componentInstance;
    fixtureNonAdmin.detectChanges();
    const elementNonAdmin = fixtureNonAdmin.nativeElement;

    const adminLink = elementNonAdmin.querySelector('a[routerLink="/admin"]');
    expect(adminLink).toBeNull(); 
  });
});
