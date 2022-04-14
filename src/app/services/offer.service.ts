import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Offer } from '../model/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getOffers() {
    return this.http.get<Offer[]>(`${this.apiRoot}/listoffer`);
  }

  addOffer(offer: Offer) {
    return this.http.post(`${this.apiRoot}/addoffer`, offer);
  }

  updateOffer(offer: Offer) {
    // console.log(offer);
    const { id, ...data } = offer;
    // console.log(offer);
    return this.http.put(`${this.apiRoot}/updateoffer/${id}`, data);
  }

  deleteOffer(offer: Offer) {
    const { id } = offer;
    return this.http.delete(`${this.apiRoot}/deleteoffer/${id}`);
  }

  getOffer(id: string) {
    return this.http.get<Offer>(`${this.apiRoot}/getoffer/${id}`);
  }
}
