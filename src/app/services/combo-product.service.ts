import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { comboProduct } from '../model/comboProduct.model';

@Injectable({
  providedIn: 'root',
})
export class ComboProductService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}
  getProducts() {
    return this.http.get<comboProduct[]>(`${this.apiRoot}/listcomboitems`);
  }
  addProduct(product: comboProduct) {
    return this.http.post(`${this.apiRoot}/addcomboitems`, product);
  }

  updateProduct(product: comboProduct) {
    // console.log(product);

    const { id, ...data } = product;
    return this.http.put(`${this.apiRoot}/updatecomboitems/${id}`, data);
  }

  uploadImage(image: File) {
    // console.log(image)
    const formData = new FormData();
    formData.append('pdt_img', image);
    // console.log(formData)

    return this.http.post<{ img_id: string; pdt_img: string }>(
      `${this.apiRoot}/addmainproductsimages`,
      formData
    );
  }

  deleteProduct(product: comboProduct) {
    const { id } = product;
    return this.http.delete(`${this.apiRoot}/deletecomboitems/${id}`);
  }
}
