import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Order, OrderStatus } from '../model/cart.model';
import { Offer } from '../model/offer.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getOrders() {
    return this.http.get<any[]>(`${this.apiRoot}/listorders`);
  }

  getorderById(id: number) {
    return this.http
      .get<Order[]>(`${this.apiRoot}/listorderbyid/${id}`)
      .pipe(map((orders) => orders[0]));
  }

  updateOrder(order: Order) {
    return this.http.post<Order>(
      `${this.apiRoot}/updateorder/${order.id}`,
      order
    );
  }

  updateOrderStatus(order: Order) {
    const { id, order_status } = order;
    return this.http.post<any>(`${this.apiRoot}/updateorderstatus/${id}`, {
      order_status,
    });
  }
  // addOffer(offer: Offer) {
  //   return this.http.post(`${this.apiRoot}/addoffer`, offer);
  // }

  // updateOffer(offer: Offer) {
  //   const { id, ...data } = offer;
  //   return this.http.put(`${this.apiRoot}/updateoffer/${id}`, data);
  // }

  // deleteOffer(offer: Offer) {
  //   const { id } = offer;
  //   return this.http.delete(`${this.apiRoot}/deleteoffer/${id}`);
  // }

  // getOffer(id: string) {
  //   return this.http.get<Offer>(`${this.apiRoot}/getoffer/${id}`);
  // }
}
