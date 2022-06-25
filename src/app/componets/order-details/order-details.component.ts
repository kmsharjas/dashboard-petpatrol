import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  lastValueFrom,
  Observable,
  switchMap,
} from 'rxjs';
import { Order, OrderStatus } from 'src/app/model/cart.model';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  OrderStatus = OrderStatus;
  orderId: number;
  courier;
  order$: Observable<Order>;

  refresh$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  envApiRoot = environment.apiBaseUrl;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get(this.envApiRoot + '/listcourierdetails').subscribe((res) => {
      console.log(res);
      this.courier = res[0];
    });
    this.order$ = combineLatest([this.refresh$, this.route.params]).pipe(
      switchMap(([refresh, params]) => {
        this.orderId = params['id'];
        return this.orderService.getorderById(this.orderId);
      })
    );
    this.order$.subscribe(console.log);
  }

  async changePaymentStatus(order: Order, status: string) {
    order.payment.payment_status = status;
    await lastValueFrom(this.orderService.updateOrder(order));
    this.refresh$.next(true);
  }

  async changeDeliveryStatus(order: Order, status: OrderStatus) {
    order.order_status = status;
    await lastValueFrom(this.orderService.updateOrderStatus(order));
    await this.updateOrder(order);
    this.refresh$.next(true);
  }

  async changeCourier(order: Order, name: string) {
    order.payment.courier = name;
    await lastValueFrom(this.orderService.updateOrder(order));
    this.refresh$.next(true);
  }

  async updateOrder(order: Order) {
    await lastValueFrom(this.orderService.updateOrder(order));
    alert('Consignment number updated');
    this.refresh$.next(true);
  }

  parseAdress(address: string) {
    return address.replace(/([h,H]ome|[W,w]ork| [o,O]thers),/g, '');
  }
}
