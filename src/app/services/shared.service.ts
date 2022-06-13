import { Injectable } from '@angular/core';
import { Blogs } from '../model/blog.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  blog: Blogs = null;
  constructor() {}
  setBlog(data: Blogs) {
    // console.log(data);

    this.blog = data;
  }
  getBlog() {
    // console.log(this.blog);
    return this.blog;
  }
}
