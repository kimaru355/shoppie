import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../interfaces/res';
import { UserDetails } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  api: string = 'http://localhost:3000/user';
  headers = new HttpHeaders({
    Authorization: localStorage.getItem('authToken') || '',
  });

  constructor(private http: HttpClient) {}

  getUserDetails(): Observable<Res<UserDetails>> {
    return this.http.get<Res<UserDetails>>(`${this.api}/details`, {
      headers: this.headers,
    });
  }

  isAdmin(): Observable<Res<boolean>> {
    return this.http.get<Res<boolean>>(`${this.api}/isAdmin`, {
      headers: this.headers,
    });
  }
}
