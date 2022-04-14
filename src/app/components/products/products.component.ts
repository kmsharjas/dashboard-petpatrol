import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';
import { Category, SubCategory } from 'src/app/model/category.model';
import { Offer } from 'src/app/model/offer.model';
import { Product } from 'src/app/model/product.model';
import { Unit } from 'src/app/model/unit.model';
import { CategoryService } from 'src/app/services/category.service';
import { OfferService } from 'src/app/services/offer.service';
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

  categories$: Observable<Category[]>;
  subCategories$: Observable<SubCategory[]>;
  Units$: Observable<Unit[]>;

  dataSource = new MatTableDataSource<Product>();
  displayColoumns = [
    'name',
    'description',
    'category',
    // 'subcategory',
    'actualprice',
    'price',
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
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      pdt_img: [null],
      vedio_url: ['', Validators.required],
      unit: [null, Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      offer_type: [null, Validators.required],
      isproductactive: [false, Validators.required],
      gst: [null, Validators.required],
      startdate: [new Date(), Validators.required],
      enddate: [new Date(), Validators.required],
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
    this.categories$ = this.categoryService.getCategories();
    this.subCategories$ = this.categoryService.getSubCategories();

    this.Units$ = this.unitService.getUnits();
    this.unit = this.unitService.getUnits();
    // this.productForm.valueChanges.subscribe(console.log);
  }

  onSubmit() {
    const product = this.productForm.value;
    // set date format to yyyy-mm-dd
    // product.startdate = formatDate(product.startdate, 'yyyy-MM-dd', 'en');
    // product.enddate = formatDate(product.enddate, 'yyyy-MM-dd', 'en');
    product.category = +product.category;
    product.subCategory = +product.subCategory;
    product.startdate = formatDate(product.startdate, 'yyyy-MM-dd', 'en');
    product.enddate = formatDate(product.enddate, 'yyyy-MM-dd', 'en');
    this.isEditing ? this.updateProduct(product) : this.createProduct(product);
  }

  onEdit(product: Product) {
    this.isEditing = true;
    this.currentProduct = product;
    product.price = product.actual_price;
    this.productForm.patchValue({ ...product, pdt_img: null });
    this.isOpen = true;
  }

  onDelete(product: Product) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(product).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  onFileChange(event: any) {
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.productImage = file;
  }

  createProduct(product: Product) {
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
          product.pdt_img = result.pdt_img;
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
          pdt_img: this.currentProduct.pdt_img,
        })
        .subscribe(() => this.resetVariables());
    }
    if (this.productImage) {
      this.productService
        .uploadImage(this.productImage)
        .pipe(
          switchMap((result) => {
            if (!result || !result.pdt_img) return of(null);
            // console.log(result);
            product.pdt_img = result.pdt_img;
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
