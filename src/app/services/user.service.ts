import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import type { LoginRequest, RegisterRequest, User } from '../models/user';

// chamadas de /auth
@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/auth`;

  register(body: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.url}/register`, body);
  }

  login({ email, password }: LoginRequest): Observable<void> {
    //Aqui ta diferente do resto pq o backend espera um formulario nao um json que nem o resto
    const body = new HttpParams().set('email', email).set('password', password);
    return this.http.post<void>(`${this.url}/login`, body);
  }

  me(): Observable<User> {
    return this.http.get<User>(`${this.url}/me`);
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.url}/logout`, null);
  }
}
