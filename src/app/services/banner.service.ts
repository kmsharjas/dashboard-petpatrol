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
    return this.http.get<Banner[]>(`${this.apiRoot}/listofferbanner`);
  }

  addBanner(banner: Banner) {
    console.log(banner);
    return this.http.post(`${this.apiRoot}/addofferbanner`, banner);
  }

  uploadImage(image: File) {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ img_id: string; image: string }>(
      `${this.apiRoot}/addimages`,
      formData
    );
  }

  updateBanner(banner: Banner) {
    // console.log(banner);
    const { id, ...data } = banner;
    // console.log(banner);
    return this.http.put(`${this.apiRoot}/updateofferbanner/${id}`, data);
  }

  deleteBanner(banner: Banner) {
    const { id } = banner;
    return this.http.delete(`${this.apiRoot}/deleteofferbanner/${id}`);
  }
}
