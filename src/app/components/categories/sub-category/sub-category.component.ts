import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, observable, switchMap } from 'rxjs';
import { Category, SubCategory } from 'src/app/model/category.model';
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

  currentSubCategory?: SubCategory;

  categories: Category[];

  displayColoumns: string[] = ['name', 'category', 'actions'];
  dataSource: MatTableDataSource<SubCategory> =
    new MatTableDataSource<SubCategory>();

  subCategoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.subCategoryForm = this.fb.group({
      name: [null, Validators.required],
      category: [null, Validators.required],
    });
  }

  get f() {
    return this.subCategoryForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.categoryService.getSubCategories()))
      .subscribe((subCategory) => {
        this.dataSource = new MatTableDataSource<SubCategory>(subCategory);
      });

    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.categories = categories));
  }

  onSubmit() {
    const subCategory = this.subCategoryForm.value;
    this.isEditing
      ? this.updateSubCategory(subCategory)
      : this.createSubCategory(subCategory);
  }

  onEdit(subCategory: SubCategory) {
    this.isEditing = true;
    this.currentSubCategory = subCategory;
    this.subCategoryForm.patchValue(subCategory);
    this.isOpen = true;
  }

  onDelete(subCategory: SubCategory) {
    this.categoryService
      .deleteSubCategory(subCategory)
      .subscribe(() => this.resetVariables());
  }

  createSubCategory(subCategory: SubCategory) {
    this.categoryService
      .addSubCategory(subCategory)
      .subscribe((res) => this.resetVariables());
  }

  updateSubCategory(subCategory: SubCategory) {
    this.categoryService
      .updateSubCategory({ id: this.currentSubCategory.id, ...subCategory })
      .subscribe((res) => this.resetVariables());
  }

  findCategory(id: number) {
    return this.categories.find((category) => category.id === id)?.category;
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.subCategoryForm.reset();
    this.refresh$.next(true);
  }
}
