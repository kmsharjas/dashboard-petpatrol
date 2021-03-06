import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, observable, switchMap } from 'rxjs';
import {
  Category,
  ServiceSub,
  SubCategory,
} from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss'],
})
export class SubCategoryComponent implements OnInit {
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  isOpen: boolean = false;
  isEditing: boolean = false;

  currentSubCategory?: ServiceSub;

  categories: SubCategory[];

  displayColoumns: string[] = ['name', 'category', 'actions'];
  dataSource: MatTableDataSource<ServiceSub> =
    new MatTableDataSource<ServiceSub>();

  subCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.subCategoryForm = this.fb.group({
      subcategory: [null, Validators.required],
      service: [null, Validators.required],
      image: [null],
    });
  }

  get f() {
    return this.subCategoryForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.categoryService.getServiceSubCategories()))
      .subscribe((subCategory) => {
        this.dataSource = new MatTableDataSource<ServiceSub>(subCategory);
      });

    this.categoryService.getServiceCategories().subscribe(
      (categories) => (this.categories = categories)
      // console.log(categories)
    );
  }

  onSubmit() {
    const subCategory = this.subCategoryForm.value;
    this.isEditing
      ? this.updateSubCategory(subCategory)
      : this.createSubCategory(subCategory);
  }

  onEdit(subCategory: ServiceSub) {
    this.isEditing = true;
    this.currentSubCategory = subCategory;
    this.subCategoryForm.patchValue(subCategory);
    this.isOpen = true;
  }

  onDelete(subCategory: ServiceSub) {
    this.categoryService
      .deleteServiceSubCategory(subCategory)
      .subscribe(() => this.resetVariables());
  }

  createSubCategory(subCategory: ServiceSub) {
    this.categoryService
      .addServiceSubCategory(subCategory)
      .subscribe((res) => this.resetVariables());
  }

  updateSubCategory(subCategory: ServiceSub) {
    this.categoryService
      .updateServiceSubCategory({
        id: this.currentSubCategory.id,
        ...subCategory,
      })
      .subscribe((res) => this.resetVariables());
  }

  findCategory(id: number) {
    return this.categories.find((category) => category.id === id)?.service;
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.subCategoryForm.reset();
    this.refresh$.next(true);
  }
}
