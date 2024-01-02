import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL, USERS_URL } from '../shared/constants/url';
import { Identification } from '../shared/interfaces/Identification';
import { User } from '../shared/interfaces/Users';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) { }

    public getAllUsers() {
        return this.http.get<User[]>(USERS_URL);
    }

    public me() {
        return this.http.get<Partial<User>>(URL.ME);
    }

    public userSelect(id: string) {
        return this.http.get<Partial<User>>(URL.USER + id);
    }

    public registerUser(
        Name: string,
        Password: string,
        Email: string,
        Adresse: string,
    ) {
        return this.http.post(URL.REGISTER, {
            Name,
            Password,
            Email,
            Adresse,
        });
    }

    public modifyUser(
        id: string,
        Name: string,
        Password: string,
        Email: string,
        Adresse: string,
    ) {
        return this.http.put(URL.USER + id, {
            Name,
            Password,
            Email,
            Adresse,
        });

    }

    public deleteUser(id: string) {
        return this.http.delete(URL.USER + id);
    }
}
