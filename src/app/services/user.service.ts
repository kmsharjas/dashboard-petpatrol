import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<AdminUser[]>(`${this.apiRoot}/listadminusers`);
  }

  addUser(user: AdminUser) {
    return this.http.post(`${this.apiRoot}/register`, user);
  }

  updateUser(user: AdminUser) {
    // console.log(user);
    const { id, ...data } = user;
    // console.log(user);
    return this.http.put(`${this.apiRoot}/updateusers/${id}`, data);
  }

  deleteUser(user: AdminUser) {
    const { id } = user;
    return this.http.delete(`${this.apiRoot}/deleteusers/${id}`);
  }
}
