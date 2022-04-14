import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, switchMap, of } from 'rxjs';
import { Offer } from 'src/app/model/offer.model';
import { OfferService } from 'src/app/services/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  offers?: Offer[];
  dataSource = new MatTableDataSource<Offer>();
  displayColoumns = ['name', 'actions'];

  offerForm: FormGroup;
  currentOffer?: Offer;

  constructor(private offerService: OfferService, private fb: FormBuilder) {
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
      .pipe(switchMap(() => this.offerService.getOffers()))
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
    this.offerForm.patchValue(offer);
    this.isOpen = true;
  }

  onDelete(offer: Offer) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.offerService.deleteOffer(offer).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  createOffer(offer: Offer) {
    this.offerService.addOffer(offer).subscribe(() => this.resetVariables());
  }

  updateOffer(offer: Offer) {
    if (!this.currentOffer) return;
    this.offerService
      .updateOffer({ ...offer, id: this.currentOffer.id })
      .subscribe(() => this.resetVariables());
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
