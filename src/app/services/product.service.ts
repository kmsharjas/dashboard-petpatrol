import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(`${this.apiRoot}/listproducts`);
  }

  addProduct(product: Product) {
    return this.http.post(`${this.apiRoot}/addproducts`, product);
  }

  updateProduct(product: Product) {
    // console.log(product);

    const { id, ...data } = product;
    return this.http.put(`${this.apiRoot}/updateproducts/${id}`, data);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('pdt_img', image);
    return this.http.post<{ img_id: string; pdt_img: string }>(
      `${this.apiRoot}/addproductsimages`,
      formData
    );
  }

  deleteProduct(product: Product) {
    const { id } = product;
    return this.http.delete(`${this.apiRoot}/deleteproducts/${id}`);
  }
}
