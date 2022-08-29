import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '../shared/api.service';
import { User } from '../shared/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private api: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentGRUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public getUser(): Observable<User | null> {
        return this.currentUser;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.api.baseUrl}/user/authenticate`, { email, password })
            .pipe(map(user => {
                localStorage.setItem('currentGRUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                location.reload();
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentGRUser');
        this.currentUserSubject.next(null);
        location.reload();
    }
}