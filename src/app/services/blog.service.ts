import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Blog, Blogs } from '../model/blog.model';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get<Blogs[]>(`${this.apiRoot}/listblogs`);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ img_id: string; image: string }>(
      `${this.apiRoot}/addimages`,
      formData
    );
  }

  addBlog(blog: Blogs) {
    return this.http.post(`${this.apiRoot}/createblogs`, blog);
  }

  updateBlog(blog: Blogs) {
    // console.log(blog);

    const { id, ...data } = blog;
    return this.http.put(`${this.apiRoot}/updateblogs/${id}`, data);
  }

  deleteBlog(blog: Blogs) {
    const { id } = blog;
    return this.http.delete(`${this.apiRoot}/deleteblogs/${id}`);
  }
}
