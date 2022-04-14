import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post(this.apiRoot + '/login/', { username, password })
      .pipe(
        map((res: any) => {
          if (!res.jwt) return false;
          sessionStorage.setItem('token', res.jwt);
          sessionStorage.setItem('user_typ', res.jwt);
          return true;
        })
      );
  }

  getAuthState() {
    const token = sessionStorage.getItem('token');

    if (!token) return of({} as AdminUser);

    return this.http
      .get<AdminUser>(this.apiRoot + '/tokenverification/', {
        headers: { token },
      })
      .pipe(map((user) => ({ ...user, desig_id: `${user.desig_id}` })));
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
