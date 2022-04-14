import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Offer } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/services/offer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  offers?: Offer[];
  dataSource = new MatTableDataSource<Offer>();
  displayColoumns = [
    'sl',
    'name',
    'price',
    'offer',
    'paymentId',
    'totalAmt',
    'totalItm',
    'orderTime',
    'orderStatus',
    'paymentStatus',
    // 'deliveryStatus',
    'actions',
  ];

  //  "id": 46,
  //       "customer_id_id": 3,
  //       "customer_name": "SHARJAS KM",
  //       "customer_mobile": "9876543210",
  //       "customer_address": ",,,,,,,,,,",
  //       "total_items": 1,
  //       "total_amount": 813,
  //       "razorpay_payment_id": "pay_J7KgX03wgaIG0o",
  //       "razorpay_order_id": "order_J7KgPKRx45qpf9",
  //       "razorpay_signature": "2eaee3bc31acc2be928b3dba796d414b362f61eebae08f1df74fe043e2cac6be",
  //       "payment_status": "captured",
  //       "delivery_status": null,
  //       "consignment_number": null,
  //       "datetime": "2022-03-15T10:31:06.388313Z",
  //       "order_status": null,
  //       "courier": null

  img: any;
  offerForm: FormGroup;
  currentOffer?: Offer;

  constructor(private orderService: OrderService, private fb: FormBuilder) {
    this.offerForm = this.fb.group({
      offertitle: ['', Validators.required],
      startdate: [new Date(), Validators.required],
      enddate: [new Date(), Validators.required],
      isofferactive: [true, Validators.required],
      minimumquantity: [1, Validators.required],
    });
  }

  get f() {
    return this.offerForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.orderService.getOrders()))
      .subscribe((offers) => {
        this.offers = offers;
        this.dataSource = new MatTableDataSource<Offer>(offers);
      });
  }

  onSubmit() {
    const offer: Offer = this.offerForm.value;
    // set date format to yyyy-mm-dd
    offer.startdate = formatDate(offer.startdate, 'yyyy-MM-dd', 'en');
    offer.enddate = formatDate(offer.enddate, 'yyyy-MM-dd', 'en');
    this.isEditing ? this.updateOffer(offer) : this.createOffer(offer);
  }

  onEdit(offer: Offer) {
    this.isEditing = true;
    this.currentOffer = offer;
    this.offerForm.patchValue({ ...offer, pdt_img: null });
    this.isOpen = true;
  }

  onDelete(offer: Offer) {
    // this.orderService.deleteOffer(offer).subscribe(() => {
    //   this.refresh$.next(true);
    // });
  }

  createOffer(offer: Offer) {
    // this.orderService.addOffer(offer).subscribe(() => this.resetVariables());
  }

  updateOffer(offer: Offer) {
    // this.orderService.updateOffer(offer).subscribe(() => this.resetVariables());
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.currentOffer = undefined;
    this.offerForm.reset({
      offertitle: '',
      startdate: new Date(),
      enddate: new Date(),
      isofferactive: true,
      minimumquantity: 1,
    });
    this.refresh$.next(true);
  }
}
