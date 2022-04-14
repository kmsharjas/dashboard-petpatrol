import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Category } from 'src/app/model/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  refresh$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  isOpen: boolean = false;
  isEditing: boolean = false;

  currentCategory?: Category;

  displayColoumns: string[] = ['name', 'actions'];
  dataSource: MatTableDataSource<Category> = new MatTableDataSource<Category>();

  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private fb: FormBuilder
  ) {
    this.categoryForm = this.fb.group({
      category: ['', Validators.required],
      image: [null],
    });
  }

  get f() {
    return this.categoryForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.categoryService.getCategories()))
      .subscribe((categories) => {
        this.dataSource = new MatTableDataSource<Category>(categories);
      });
  }

  onSubmit() {
    const category = this.categoryForm.value;
    this.isEditing
      ? this.updateCategory(category)
      : this.createCategory(category);
  }

  onEdit(category: Category) {
    this.isEditing = true;
    this.currentCategory = category;
    this.categoryForm.patchValue(category);
    this.isOpen = true;
  }

  onDelete(category: Category) {
    this.categoryService
      .deleteCategory(category)
      .subscribe(() => this.resetVariables());
  }

  createCategory(category: Category) {
    this.categoryService
      .addCategory(category)
      .subscribe((res) => this.resetVariables());
  }

  updateCategory(category: Category) {
    this.categoryService
      .updateCategory({ id: this.currentCategory.id, ...category })
      .subscribe((res) => this.resetVariables());
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.categoryForm.reset({ image: null });
    this.refresh$.next(true);
  }
}
