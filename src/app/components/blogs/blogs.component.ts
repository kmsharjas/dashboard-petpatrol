import { formatDate } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { Blog, Blogs } from 'src/app/model/blog.model';
import { Category, SubCategory } from 'src/app/model/category.model';
import { Offer } from 'src/app/model/offer.model';
import { Product } from 'src/app/model/product.model';
import { Unit } from 'src/app/model/unit.model';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { OfferService } from 'src/app/services/offer.service';
import { ProductService } from 'src/app/services/product.service';
import { SharedService } from 'src/app/services/shared.service';
import { UnitService } from 'src/app/services/unit.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss'],
})
export class BlogsComponent implements OnInit {
  @Output() event = new EventEmitter<object>();
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  blogs?: Blogs[];

  dataSource = new MatTableDataSource<Blogs>();
  displayColoumns = ['title', 'actions'];

  // displayColoumns = ['name', 'price', 'offer', 'actions'];
  img: any;
  blogForm: FormGroup;
  currentBlog?: Blogs;
  blogImage?: File;
  unit: any;
  constructor(
    private shared: SharedService,
    private blogservice: BlogService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      title: ['', Validators.required],
      // createdAt: [new Date(), Validators.required],
      image: ['', Validators.required],
      para1: ['', Validators.required],
      para2: ['', Validators.required],
    });
  }

  get f() {
    return this.blogForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.blogservice.getBlogs()))
      .subscribe((blogs) => {
        // console.log(blogs);

        this.blogs = blogs;
        this.dataSource = new MatTableDataSource<Blogs>(blogs);
      });
  }

  onSubmit() {
    const blog = this.blogForm.value;
    // this.isEditing ? this.updateProduct(blog) : this.createProduct(blog);
  }

  onEdit(blog: Blogs) {
    // console.log(blog);
    // this.event.emit(blog);
    this.shared.setBlog(blog);
    this.router.navigate(['../editor']);
    this.isEditing = true;
    this.currentBlog = blog;
    this.blogForm.patchValue({ ...blog, image: null });
    this.isOpen = true;
  }

  onDelete(blog: Blogs) {
    if (confirm('Are you sure you want to delete this blog?')) {
      this.blogservice.deleteBlog(blog).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  onFileChange(event: any) {
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.blogImage = file;
  }

  // createProduct(blog: Blog) {
  //   if (!this.blogImage) return;
  //   //ipload image
  //   // console.log(this.blogImage);

  //   this.blogservice
  //     .uploadImage(this.blogImage)
  //     .pipe(
  //       switchMap((result) => {
  //         // console.log(result);

  //         if (!result || !result.pdt_img) return of(null);
  //         // console.log(result);
  //         blog.image = result.pdt_img;
  //         return this.blogservice.addBlog(blog);
  //       })
  //     )
  //     .subscribe(() => this.resetVariables());
  // }

  // updateProduct(blog: Blog) {
  //   if (!this.currentBlog) return;
  //   if (!this.blogImage) {
  //     this.blogservice
  //       .updateBlog({
  //         ...blog,
  //         id: this.currentBlog.id,
  //         image: this.currentBlog.image,
  //       })
  //       .subscribe(() => this.resetVariables());
  //   }
  //   if (this.blogImage) {
  //     this.blogservice
  //       .uploadImage(this.blogImage)
  //       .pipe(
  //         switchMap((result) => {
  //           if (!result || !result.pdt_img) return of(null);
  //           // console.log(result);
  //           blog.image = result.pdt_img;
  //           return this.blogservice.updateBlog({
  //             ...blog,
  //             id: this.currentBlog?.id,
  //           });
  //         })
  //       )
  //       .subscribe(() => this.resetVariables());
  //   }
  // }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.blogImage = undefined;
    this.blogForm.reset();
    this.refresh$.next(true);
  }

  // disable enter key for the form
  onKeydown(event) {
    // console.log(event);
    if (event.key === 'Enter') {
      // console.log('prevents');

      event.preventDefault();
    }
  }
}
