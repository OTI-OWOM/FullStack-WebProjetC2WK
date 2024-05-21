import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { URL } from '../constants/url';
import { of, throwError } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    // Mock sessionStorage
    spyOn(sessionStorage, 'getItem').and.callFake((key: string) => {
      return key === 'token' ? 'mocked-token' : 'mocked-userId';
    });
    spyOn(sessionStorage, 'setItem').and.callFake(() => null);
    spyOn(sessionStorage, 'removeItem').and.callFake(() => null);
    service = TestBed.inject(AuthService);
});

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to login if not authenticated', (done) => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('Error')));
    service.isAuthenticated().subscribe(isAuth => {
      expect(isAuth).toBe(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
      done();
    });
  });

  it('should return true if authenticated', (done) => {
    httpClientSpy.get.and.returnValue(of({}));
    service.isAuthenticated().subscribe(isAuth => {
      expect(isAuth).toBe(true);
      done();
    });
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toEqual(URL.ME);
  });

  it('should handle loginUser and store session data', (done) => {
    const mockResponse = { userId: '123', role: true, token: 'abc123' };
    httpClientSpy.post.and.returnValue(of(mockResponse));
    service.loginUser('test@example.com', 'password').subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(sessionStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
      expect(sessionStorage.setItem).toHaveBeenCalledWith('userId', '123');
      done();
    });
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toEqual(URL.LOGIN);  
  });

  it('should logout and clear session data', () => {
    service.logout();
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('token');
    expect(sessionStorage.removeItem).toHaveBeenCalledWith('userId');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should return true if user is admin', (done) => {
    httpClientSpy.get.and.returnValue(of({}));
    service.isAdmin().subscribe(isAdmin => {
      expect(isAdmin).toBe(true);
      done();
    });
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toEqual(URL.IS_ADMIN);
  });

  it('should navigate to product page if isAdmin check fails', (done) => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('Access Denied')));
    service.isAdmin().subscribe(isAdmin => {
      expect(isAdmin).toBe(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/product']);
      done();
    });
  });

  it('should return true if user is seller', (done) => {
    httpClientSpy.get.and.returnValue(of({}));
    service.isSeller().subscribe(isSeller => {
      expect(isSeller).toBe(true);
      done();
    });
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toEqual(URL.IS_ADMIN); 
  });

  it('should navigate to product page if isSeller check fails', (done) => {
    httpClientSpy.get.and.returnValue(throwError(() => new Error('Access Denied')));
    service.isSeller().subscribe(isSeller => {
      expect(isSeller).toBe(false);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/product']);
      done();
    });
  });

});
