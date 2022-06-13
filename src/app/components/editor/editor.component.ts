import { Component, OnInit } from '@angular/core';
import { VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { Blogs } from 'src/app/model/blog.model';
import { BlogService } from 'src/app/services/blog.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  isEditing = false;
  blog: Blogs = null;
  title;
  thumbDesc;
  thumbImg;
  content;
  blogForm: FormGroup;
  currentBlog: Blogs;
  thumbImage: any;
  refresh$ = new BehaviorSubject(true);
  constructor(
    private shared: SharedService,
    private fb: FormBuilder,
    private blogservice: BlogService,
    private router: Router
  ) {
    this.blogForm = this.fb.group({
      heading: ['', Validators.required],
      titleDesc: ['', Validators.required],
      thumb_Image: ['', Validators.required],
      content: ['', Validators.required],
      // content: [new Date(), Validators.required],
      // enddate: [new Date(), Validators.required],
      // isofferactive: [true, Validators.required],
      // minimumquantity: [1, Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(VERSION.full);
    // this.resetVariables();
    this.blog = this.shared.getBlog();
    console.log(this.blog);
    if (this.blog) {
      this.blogForm.get('thumb_Image').setValue(this.blog.thumb_Image);
    }
    this.currentBlog = this.blog;
    this.blogForm.patchValue(this.blog);
  }
  onSubmit() {
    const blog: Blogs = this.blogForm.value;
    console.log(blog);
    if (this.blog) {
      this.isEditing = true;
    }
    console.log(this.isEditing);

    // set date format to yyyy-mm-dd
    // offer.startdate = formatDate(offer.startdate, 'yyyy-MM-dd', 'en');
    // offer.enddate = formatDate(offer.enddate, 'yyyy-MM-dd', 'en');
    this.isEditing ? this.updateBanner(blog) : this.createBanner(blog);
  }
  onFileChange(event: any) {
    console.log(event.target.files);
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.thumbImage = file;
  }

  createBanner(blog: Blogs) {
    if (!this.thumbImage) return;
    //ipload image
    console.log(this.thumbImage);

    this.blogservice
      .uploadImage(this.thumbImage)
      .pipe(
        switchMap((result) => {
          console.log(result);

          if (!result || !result.image) return of(null);
          console.log(result);
          blog.thumb_Image = result.image;
          return this.blogservice.addBlog(blog);
        })
      )
      .subscribe(() => this.resetVariables());
  }

  updateBanner(banner: Blogs) {
    if (!this.currentBlog) return;
    if (!this.thumbImage) {
      this.blogservice
        .updateBlog({
          ...banner,
          id: this.currentBlog.id,
          thumb_Image: this.currentBlog.thumb_Image,
        })
        .subscribe(() => this.resetVariables());
    }
    if (this.thumbImage) {
      this.blogservice
        .uploadImage(this.thumbImage)
        .pipe(
          switchMap((result) => {
            if (!result || !result.image) return of(null);
            // console.log(result);
            banner.thumb_Image = result.image;
            return this.blogservice.updateBlog({
              ...banner,
              id: this.currentBlog?.id,
            });
          })
        )
        .subscribe(() => this.resetVariables());
    }
  }
  resetVariables() {
    // this.isOpen = false;
    this.isEditing = false;
    this.currentBlog = undefined;
    this.blog = undefined;
    this.blogForm.reset({
      // offertitle: '',
      // startdate: new Date(),
      // enddate: new Date(),
      // isofferactive: true,
      // minimumquantity: 1,
    });
    this.refresh$.next(true);
    this.router.navigate(['/blogs']);
  }
}
