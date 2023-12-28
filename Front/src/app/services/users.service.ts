import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    public me(token: string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Partial<User>>(URL.ME, { headers });
    }

    public userSelect(token: string, id: string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.get<Partial<User>>(URL.USER + id, { headers });
    }

    public loginUser(Email: string, Password: string) {
        return this.http.post<Identification[]>(URL.LOGIN, {
            Email,
            Password,
        });
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
        token: string,
        id: string,
        Name: string,
        Password: string,
        Email: string,
        Adresse: string,
    ) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.put(URL.USER + id, {
            Name,
            Password,
            Email,
            Adresse,
        }, { headers });

    }

    public deleteUser(token: string, id: string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.delete(URL.USER + id, { headers });
    }
}
