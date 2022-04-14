import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Blog } from '../model/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<Blog[]>(`${this.apiRoot}/listblog`);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('pdt_img', image);
    return this.http.post<{ img_id: string; pdt_img: string }>(
      `${this.apiRoot}/addproductsimages`,
      formData
    );
  }

  addBlog(blog: Blog) {
    return this.http.post(`${this.apiRoot}/createblog`, blog);
  }

  updateBlog(blog: Blog) {
    // console.log(blog);

    const { id, ...data } = blog;
    return this.http.put(`${this.apiRoot}/updateblog/${id}`, data);
  }

  deleteBlog(blog: Blog) {
    const { id } = blog;
    return this.http.delete(`${this.apiRoot}/deleteblog/${id}`);
  }
}
