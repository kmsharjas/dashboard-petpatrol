import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { District, State } from '../model/state.model';
import { Designation } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class OtherService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getDistrict() {
    return this.http.get<District[]>(`${this.apiRoot}/listdistricts`);
  }

  getStates() {
    return this.http.get<State[]>(`${this.apiRoot}/liststates`);
  }

  getCountries() {
    return this.http.get<State[]>(`${this.apiRoot}/listcountries`);
  }

  getDesignation() {
    return this.http.get<Designation[]>(`${this.apiRoot}/listdesignation`);
  }
}
