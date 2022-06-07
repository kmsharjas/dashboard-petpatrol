import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banner } from '../model/banner.model';

@Injectable({
  providedIn: 'root',
})
export class BannerService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBanners() {
    return this.http.get<Banner[]>(`${this.apiRoot}/listbanner`);
  }

  addBanner(banner: Banner) {
    console.log(banner);
    return this.http.post(`${this.apiRoot}/addbannerimage`, banner);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('pdt_img', image);
    return this.http.post<{ img_id: string; pdt_img: string }>(
      `${this.apiRoot}/addproductsimages`,
      formData
    );
  }

  updateBanner(banner: Banner) {
    // console.log(banner);
    const { id, ...data } = banner;
    // console.log(banner);
    return this.http.put(`${this.apiRoot}/updatebannerimage/${id}`, data);
  }

  deleteBanner(banner: Banner) {
    const { id } = banner;
    return this.http.delete(`${this.apiRoot}/deletebanner/${id}`);
  }
}
