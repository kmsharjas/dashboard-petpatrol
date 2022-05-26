import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Packing } from '../model/packing.model';

@Injectable({
  providedIn: 'root',
})
export class PackingService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPacking() {
    return this.http.get<Packing[]>(`${this.apiRoot}/listpackagingtype`);
  }

  addPacking(offer: Packing) {
    return this.http.post(`${this.apiRoot}/addpackagingtype`, offer);
  }

  updatePacking(offer: Packing) {
    // console.log(offer);
    const { id, ...data } = offer;
    // console.log(offer);
    return this.http.put(`${this.apiRoot}/updatepackagingtype/${id}`, data);
  }

  deletePacking(offer: Packing) {
    const { id } = offer;
    return this.http.delete(`${this.apiRoot}/deletepackagingtype/${id}`);
  }
}
