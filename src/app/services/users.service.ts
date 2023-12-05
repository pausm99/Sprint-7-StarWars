import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public userToken = signal<string>('');

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('accessToken');
    token ? this.userToken.set(token) : this.userToken.set('');
  }

  register(data: string): Observable<User> {
    return this.http.post<User>(`${url}register`, data,httpOptions);
  }

  login(data: string): Observable<User> {
    return this.http.post<User>(`${url}login`, data, httpOptions);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.userToken.set('');
  }

  isEmailRegistered(email: string): Observable<boolean> {
    return this.http.get<User[]>(`${url}users?email=${email}`).pipe(
      map(users => users.length > 0)
    );
  }

  updateUser(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    this.userToken.set(accessToken);
  }

  isUserLoggedIn(): boolean {
    return localStorage.getItem('accessToken') ? true : false;
  }
}
