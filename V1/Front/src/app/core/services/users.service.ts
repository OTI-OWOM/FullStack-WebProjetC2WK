import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from '../constants/url';
import { User } from '../models/Users';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) { }

    public getAllUsers() {
        return this.http.get<User[]>(URL.USERS);
    }

    public me() {
        return this.http.get<Partial<User>>(URL.ME);
    }

    public userSelect(id: string) {
        return this.http.get<Partial<User>>(URL.USER + id);
    }

    public modifyUser(id: string, user: Partial<User>) {
        return this.http.put(URL.USER + id, user);
    }

    public deleteUser(id: string) {
        return this.http.delete(URL.USER + id);
    }

    public modifyUserSelf(user: Partial<User>) {
        return this.http.put(URL.ME, user);
    }

    public deleteUserSelf() {
        return this.http.delete(URL.ME);
    }
}
