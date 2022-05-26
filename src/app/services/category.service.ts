import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category, ServiceSub, SubCategory } from '../model/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${this.apiRoot}/listanimalcategory`);
  }

  addCategory(category: Category) {
    console.log(category);

    return this.http.post(`${this.apiRoot}/addanimalcategory`, category);
  }

  updateCategory(category: Category) {
    const { id, ...data } = category;
    return this.http.put(`${this.apiRoot}/updateanimalcategory/${id}`, data);
  }

  deleteCategory(category: Category) {
    const { id } = category;
    return this.http.delete(`${this.apiRoot}/deleteanimalcategory/${id}`);
  }

  // service category

  getServiceCategories() {
    return this.http.get<SubCategory[]>(`${this.apiRoot}/listservicecategory`);
  }

  addServiceCategory(subCategory: SubCategory) {
    return this.http.post(`${this.apiRoot}/addservicecategory`, subCategory);
  }

  updateServiceCategory(subCategory: SubCategory) {
    const { id, ...data } = subCategory;
    return this.http.put(`${this.apiRoot}/updateservicecategory/${id}`, data);
  }

  deleteServiceCategory(subCategory: SubCategory) {
    const { id } = subCategory;
    return this.http.delete(`${this.apiRoot}/deleteservicecategory/${id}`);
  }

  // subcategory

  getServiceSubCategories() {
    return this.http.get<ServiceSub[]>(
      `${this.apiRoot}/listservicesubcategory`
    );
  }

  addServiceSubCategory(subCategory: ServiceSub) {
    return this.http.post(`${this.apiRoot}/addservicesubcategory`, subCategory);
  }

  updateServiceSubCategory(subCategory: ServiceSub) {
    const { id, ...data } = subCategory;
    return this.http.put(
      `${this.apiRoot}/updateservicesubcategory/${id}`,
      data
    );
  }

  deleteServiceSubCategory(subCategory: ServiceSub) {
    const { id } = subCategory;
    return this.http.delete(`${this.apiRoot}/deleteservicesubcategory/${id}`);
  }

  // getUnits() {
  //   return this.http.get<Unit[]>(`${this.apiRoot}/listunits`);
  // }
}
