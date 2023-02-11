import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL, USERS_URL } from '../shared/constants/url';
import { Identification } from '../shared/interfaces/Identification';
import { User } from '../shared/interfaces/Users';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private http: HttpClient) {}

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

    public loginUser(email: string, password: string) {
        return this.http.post<Identification[]>(URL.LOGIN, {
            email,
            password,
        });
    }

    public registerUser(
        username: string,
        password: string,
        email: string,
        adresse: string,
    ) {
        return this.http.post(URL.REGISTER, {
            username,
            password,
            email,
            adresse,
        });
    }

    public modifyUser(
        token: string,
        id: string,
        username: string,
        password: string,
        email: string,
        adresse: string,
    ) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        if (password !== '') {
            return this.http.put(URL.USER + id, {
                username,
                password,
                email,
                adresse,
            }, { headers });
        }
        return this.http.put(URL.USER + id, {
            username,
            email,
            adresse,
        }, { headers });
    }

    public deleteUser(token:string, id:string) {
        const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
        return this.http.delete(URL.USER + id, { headers });
    }
}
