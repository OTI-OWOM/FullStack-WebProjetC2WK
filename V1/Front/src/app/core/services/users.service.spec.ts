import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { URL } from '../constants/url';
import { UsersService } from './users.service';
import { of } from 'rxjs';
import { User } from '@core/models/Users';

describe('UsersService', () => {
  let service: UsersService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    const expectedUsers = [
      { id: '1', Name: 'John', LastName: 'Doe' } as User
    ];
    httpClientSpy.get.and.returnValue(of(expectedUsers));
    service.getAllUsers().subscribe(users => {
      expect(users).toEqual(expectedUsers);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toEqual(URL.USERS);
  });

  it('should fetch current user data', () => {
    const partialUser = { Name: 'John' } as Partial<User>;
    httpClientSpy.get.and.returnValue(of(partialUser));
    service.me().subscribe(user => {
      expect(user).toEqual(partialUser);
    });
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toEqual(URL.ME);
  });

  it('should send a POST request to register a user', () => {
    const newUser = {
      Name: 'Jane', LastName: 'Doe', Password: '123456', Email: 'jane@example.com',
      Address: '123 Main St', City: 'Anytown', PostalCode: '12345'
    };
    httpClientSpy.post.and.returnValue(of({}));
    service.registerUser(
      newUser.Name, newUser.LastName, newUser.Password, newUser.Email,
      newUser.Address, newUser.City, newUser.PostalCode
    ).subscribe(response => expect(response).toEqual({}));
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toEqual(URL.REGISTER);
    expect(httpClientSpy.post.calls.mostRecent().args[1]).toEqual(newUser);
  });

  it('should fetch a specific user by ID', () => {
    const id = '123';
    const expectedUser = { id: id, Name: 'Alice', LastName: 'Smith' } as Partial<User>;
    httpClientSpy.get.and.returnValue(of(expectedUser));
    service.userSelect(id).subscribe(user => {
      expect(user).toEqual(expectedUser);
    });
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toEqual(URL.USER + id);
  });
  
  it('should update a user', () => {
    const id = '123';
    const updateUser = { Name: 'Bob' } as Partial<User>;
    httpClientSpy.put.and.returnValue(of(updateUser));
    service.modifyUser(id, updateUser).subscribe(user => {
      expect(user).toEqual(updateUser);
    });
    expect(httpClientSpy.put.calls.mostRecent().args[0]).toEqual(URL.USER + id);
    expect(httpClientSpy.put.calls.mostRecent().args[1]).toEqual(updateUser);
  });
  
  it('should delete a user', () => {
    const id = '123';
    httpClientSpy.delete.and.returnValue(of({}));
    service.deleteUser(id).subscribe(response => {
      expect(response).toEqual({});
    });
    expect(httpClientSpy.delete.calls.mostRecent().args[0]).toEqual(URL.USER + id);
  });
  
  it('should update the authenticated user’s information', () => {
    const updateUser = { Name: 'Updated Name' } as Partial<User>;
    httpClientSpy.put.and.returnValue(of(updateUser));
    service.modifyUserSelf(updateUser).subscribe(user => {
      expect(user).toEqual(updateUser);
    });
    expect(httpClientSpy.put.calls.mostRecent().args[0]).toEqual(URL.ME);
    expect(httpClientSpy.put.calls.mostRecent().args[1]).toEqual(updateUser);
  });
  
  it('should delete the authenticated user', () => {
    httpClientSpy.delete.and.returnValue(of({}));
    service.deleteUserSelf().subscribe(response => {
      expect(response).toEqual({});
    });
    expect(httpClientSpy.delete.calls.mostRecent().args[0]).toEqual(URL.ME);
  });
});
