import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import {
  Category,
  ServiceSub,
  SubCategory,
} from 'src/app/model/category.model';
import { Offer } from 'src/app/model/offer.model';
import { Packing } from 'src/app/model/packing.model';
import { Product } from 'src/app/model/product.model';
import { Unit } from 'src/app/model/unit.model';
import { CategoryService } from 'src/app/services/category.service';
import { OfferService } from 'src/app/services/offer.service';
import { PackingService } from 'src/app/services/packing.service';
import { ProductService } from 'src/app/services/product.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  products?: Product[];

  offers$?: Observable<Offer[]>;
  packing$?: Observable<Packing[]>;

  animalCategories$: Observable<Category[]>;
  serviceCategories$: Observable<SubCategory[]>;
  serviceSubCategories$: Observable<ServiceSub[]>;
  Units$: Observable<Unit[]>;

  dataSource = new MatTableDataSource<Product>();
  displayColoumns = [
    'name',
    'description',
    'category',
    // 'subcategory',
    'actualprice',
    // 'price',
    'offer',
    'actions',
  ];

  // displayColoumns = ['name', 'price', 'offer', 'actions'];
  img: any;
  productForm: FormGroup;
  currentProduct?: Product;
  productImage?: File;
  unit: any;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private offerService: OfferService,
    private unitService: UnitService,
    private packageService: PackingService,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      countInstock: ['', Validators.required],
      animalCategory: ['', Validators.required],
      serviceCategory: ['', Validators.required],
      serviceSubcategory: ['', Validators.required],
      gstPercentage: ['', Validators.required],
      offertitle: ['', Validators.required],
      isProductiveactive: ['', Validators.required],
      startDate: [new Date(), Validators.required],
      endDate: [new Date(), Validators.required],
      units: ['', Validators.required],
      thumbnail_img: ['', Validators.required],
      packaging_type: ['', Validators.required],
      // pdt_img: [null],
      // vedio_url: ['', Validators.required],
      // unit: [null, Validators.required],
      // category: ['', Validators.required],
      // subcategory: ['', Validators.required],
      // offer_type: [null, Validators.required],
      // isproductactive: [false, Validators.required],
      // gst: [null, Validators.required],
      // startdate: [new Date(), Validators.required],
      // enddate: [new Date(), Validators.required],
    });
  }

  get f() {
    return this.productForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.productService.getProducts()))
      .subscribe((products) => {
        // console.log(products);

        this.products = products;
        this.dataSource = new MatTableDataSource<Product>(products);
      });

    this.offers$ = this.offerService.getOffers();
    this.packing$ = this.packageService.getPacking();
    this.animalCategories$ = this.categoryService.getCategories();
    this.serviceCategories$ = this.categoryService.getServiceCategories();
    this.serviceSubCategories$ = this.categoryService.getServiceSubCategories();
    this.Units$ = this.unitService.getUnits();
    this.unit = this.unitService.getUnits();
    // this.productForm.valueChanges.subscribe(console.log);
  }

  changeService(anim) {
    console.log(anim);
    // this.productForm.controlsserviceCategory
    this.serviceCategories$ = this.categoryService.getServiceCategories().pipe(
      switchMap((categories) => {
        return of(categories.filter((category) => category.animal === anim));
      })
    );
  }

  changeSub(serv) {
    console.log(serv);
    this.serviceSubCategories$ = this.categoryService
      .getServiceSubCategories()
      .pipe(
        switchMap((categories) => {
          return of(categories.filter((category) => category.service === serv));
        })
      );
  }

  onSubmit() {
    const product = this.productForm.value;
    // set date format to yyyy-mm-dd
    // product.startdate = formatDate(product.startdate, 'yyyy-MM-dd', 'en');
    // product.enddate = formatDate(product.enddate, 'yyyy-MM-dd', 'en');
    product.animalCategory = +product.animalCategory;
    product.serviceCategory = +product.serviceCategory;
    product.serviceSubcategory = +product.serviceSubcategory;
    product.startDate = formatDate(product.startDate, 'yyyy-MM-dd', 'en');
    product.endDate = formatDate(product.endDate, 'yyyy-MM-dd', 'en');
    this.isEditing ? this.updateProduct(product) : this.createProduct(product);
  }

  onEdit(product: Product) {
    console.log(product);
    this.productForm.get('thumbnail_img').setValue(product.thumbnail_img);
    this.isEditing = true;
    this.currentProduct = product;
    // product.price = product.actual_price;
    product.price = product.price;
    this.productForm.patchValue({ ...product, thumbnail_img: null });
    this.isOpen = true;
    console.log(this.productForm.value);
  }

  onDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  onFileChange(event: any) {
    console.log(event.target.files);
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.productImage = file;
  }

  createProduct(product: Product) {
    if (!this.productImage) return;
    //ipload image
    console.log(this.productImage);

    this.productService
      .uploadImage(this.productImage)
      .pipe(
        switchMap((result) => {
          console.log(result);

          if (!result || !result.image) return of(null);
          // console.log(result);
          product.thumbnail_img = result.image;
          return this.productService.addProduct(product);
        })
      )
      .subscribe(() => this.resetVariables());
  }

  updateProduct(product: Product) {
    if (!this.currentProduct) return;
    if (!this.productImage) {
      this.productService
        .updateProduct({
          ...product,
          id: this.currentProduct.id,
          thumbnail_img: this.currentProduct.thumbnail_img,
        })
        .subscribe(() => this.resetVariables());
    }
    if (this.productImage) {
      this.productService
        .uploadImage(this.productImage)
        .pipe(
          switchMap((result) => {
            if (!result || !result.image) return of(null);
            // console.log(result);
            product.thumbnail_img = result.image;
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
    this.productForm.reset({
      isofferactive: false,
      iscomboactive: false,
      isproductactive: false,
      startdate: new Date(),
      enddate: new Date(),
    });
    this.refresh$.next(true);
  }
}
