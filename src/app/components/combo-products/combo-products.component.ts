import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { comboProduct } from 'src/app/model/comboProduct.model';
import { ComboProductService } from 'src/app/services/combo-product.service';

@Component({
  selector: 'app-combo-products',
  templateUrl: './combo-products.component.html',
  styleUrls: ['./combo-products.component.scss'],
})
export class ComboProductsComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  comboProducts?: comboProduct[];
  dataSource = new MatTableDataSource<comboProduct>();
  displayColoumns = ['name', 'desc', 'price', 'actions'];

  currentProduct?: comboProduct;
  productImage?: File;
  comboProductForm: FormGroup;
  constructor(
    private productService: ComboProductService,
    private fb: FormBuilder
  ) {
    this.comboProductForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      desc: [null, Validators.required],
      price: [0],
      qty: [0],
      images: [null, Validators.required],
    });
  }

  get f() {
    return this.comboProductForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.productService.getProducts()))
      .subscribe((products) => {
        this.comboProducts = products;
        this.dataSource = new MatTableDataSource<comboProduct>(products);
      });

    this.comboProductForm.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    const product = this.comboProductForm.value;
    // set date format to yyyy-mm-dd
    this.isEditing ? this.updateProduct(product) : this.createProduct(product);
  }

  onEdit(product: comboProduct) {
    this.isEditing = true;
    this.currentProduct = product;
    this.comboProductForm.patchValue({ ...product, images: null });
    this.isOpen = true;
  }

  onDelete(product: comboProduct) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.refresh$.next(true);
    });
  }

  onFileChange(event: any) {
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.productImage = file;
  }

  createProduct(product: comboProduct) {
    if (!this.productImage) return;
    //ipload image
    // console.log(this.productImage);

    this.productService
      .uploadImage(this.productImage)
      .pipe(
        switchMap((result) => {
          // console.log(result);

          if (!result || !result.pdt_img) return of(null);
          // console.log(result);
          product.images = result.pdt_img;
          return this.productService.addProduct(product);
        })
      )
      .subscribe(() => this.resetVariables());
  }

  updateProduct(product: comboProduct) {
    if (!this.currentProduct) return;
    if (!this.productImage) {
      this.productService
        .updateProduct({
          ...product,
          id: this.currentProduct.id,
          images: this.currentProduct.images,
        })
        .subscribe(() => this.resetVariables());
    }
    if (this.productImage) {
      // console.log(this.productImage);
      this.productService
        .uploadImage(this.productImage)
        .pipe(
          switchMap((result) => {
            // console.log(result);

            if (!result || !result.pdt_img) return of(null);
            // console.log(result);
            product.images = result.pdt_img;
            return this.productService.updateProduct({
              ...product,
              id: this.currentProduct?.id,
            });
          })
        )
        .subscribe(() => this.resetVariables());
    }
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.productImage = undefined;
    this.comboProductForm.reset({
      isofferactive: false,
      iscomboactive: false,
      isproductactive: false,
      startdate: new Date(),
      enddate: new Date(),
    });
    this.refresh$.next(true);
  }
}
