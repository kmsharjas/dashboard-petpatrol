import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { AdminUser } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<Customer[]>(`${this.apiRoot}/listcustomers`);
  }

  addCustomer(customer: Customer) {
    return this.http.post(`${this.apiRoot}/createCustomer`, customer);
  }

  updateCustomer(customer: Customer) {
    // console.log(Customer);
    const { id, ...data } = customer;
    // console.log(Customer);
    return this.http.put(`${this.apiRoot}/updateadminCustomers/${id}`, data);
  }

  deleteCustomer(customer: Customer) {
    const { id } = customer;
    return this.http.delete(`${this.apiRoot}/deleteoffer/${id}`);
  }
}
