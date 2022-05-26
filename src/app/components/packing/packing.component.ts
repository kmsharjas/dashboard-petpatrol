import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Packing } from 'src/app/model/packing.model';
import { PackingService } from 'src/app/services/packing.service';

@Component({
  selector: 'app-packing',
  templateUrl: './packing.component.html',
  styleUrls: ['./packing.component.scss'],
})
export class PackingComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  packing?: Packing[];
  dataSource = new MatTableDataSource<Packing>();
  displayColoumns = ['name', 'actions'];

  packingForm: FormGroup;
  currentPacking?: Packing;

  constructor(private packingService: PackingService, private fb: FormBuilder) {
    this.packingForm = this.fb.group({
      type: ['', Validators.required],
      // startdate: [new Date(), Validators.required],
      // enddate: [new Date(), Validators.required],
      // isofferactive: [true, Validators.required],
      // minimumquantity: [1, Validators.required],
    });
  }

  get f() {
    return this.packingForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.packingService.getPacking()))
      .subscribe((packing) => {
        this.packing = packing;
        this.dataSource = new MatTableDataSource<Packing>(packing);
      });
  }

  onSubmit() {
    const packing: Packing = this.packingForm.value;
    // set date format to yyyy-mm-dd
    // offer.startdate = formatDate(offer.startdate, 'yyyy-MM-dd', 'en');
    // offer.enddate = formatDate(offer.enddate, 'yyyy-MM-dd', 'en');
    this.isEditing ? this.updateOffer(packing) : this.createOffer(packing);
  }

  onEdit(packing: Packing) {
    this.isEditing = true;
    this.currentPacking = packing;
    this.packingForm.patchValue(packing);
    this.isOpen = true;
  }

  onDelete(packing: Packing) {
    if (confirm('Are you sure you want to delete this Packing?')) {
      this.packingService.deletePacking(packing).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  createOffer(packing: Packing) {
    this.packingService
      .addPacking(packing)
      .subscribe(() => this.resetVariables());
  }

  updateOffer(packing: Packing) {
    if (!this.currentPacking) return;
    this.packingService
      .updatePacking({ ...packing, id: this.currentPacking.id })
      .subscribe(() => this.resetVariables());
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.currentPacking = undefined;
    this.packingForm.reset({
      offer: '',
      // startdate: new Date(),
      // enddate: new Date(),
      // isofferactive: true,
      // minimumquantity: 1,
    });
    this.refresh$.next(true);
  }
}
