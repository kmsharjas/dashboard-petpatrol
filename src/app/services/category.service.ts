import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, SubCategory } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${this.apiRoot}/listcategory`);
  }

  addCategory(category: Category) {
    return this.http.post(`${this.apiRoot}/addcategory`, category);
  }

  updateCategory(category: Category) {
    const { id, ...data } = category;
    return this.http.put(`${this.apiRoot}/updatecategory/${id}`, data);
  }

  deleteCategory(category: Category) {
    const { id } = category;
    return this.http.delete(`${this.apiRoot}/deletecategory/${id}`);
  }

  // subcategory

  getSubCategories() {
    return this.http.get<SubCategory[]>(`${this.apiRoot}/listsubcategory`);
  }

  addSubCategory(subCategory: SubCategory) {
    return this.http.post(`${this.apiRoot}/addsubcategory`, subCategory);
  }

  updateSubCategory(subCategory: SubCategory) {
    const { id, ...data } = subCategory;
    return this.http.put(`${this.apiRoot}/updatesubcategory/${id}`, data);
  }

  deleteSubCategory(subCategory: SubCategory) {
    const { id } = subCategory;
    return this.http.delete(`${this.apiRoot}/deletesubcategory/${id}`);
  }

  // getUnits() {
  //   return this.http.get<Unit[]>(`${this.apiRoot}/listunits`);
  // }
}
