import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { Banner } from 'src/app/model/banner.model';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
})
export class BannersComponent implements OnInit {
  refresh$ = new BehaviorSubject(true);
  isOpen = false;
  isEditing = false;

  banners?: Banner[];
  dataSource = new MatTableDataSource<Banner>();
  bannerForm: FormGroup;
  currentBanner?: Banner;
  bannerImage?: File;
  displayColoumns = [
    'image',
    'h4content',
    'h2contentbold',
    'h2contentlight',
    'actions',
  ];
  constructor(private bannerservice: BannerService, private fb: FormBuilder) {
    this.bannerForm = this.fb.group({
      image: ['', Validators.required],
      h4content: ['', Validators.required],
      h2contentbold: ['', Validators.required],
      h2contentlight: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.bannerservice.getBanners()))
      .subscribe((banners) => {
        this.banners = banners;
        this.dataSource = new MatTableDataSource<Banner>(banners);
      });
  }

  onFileChange(event: any) {
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.bannerImage = file;
  }

  onSubmit() {
    const banner: Banner = this.bannerForm.value;
    this.isEditing ? this.updateBanner(banner) : this.createBanner(banner);
  }

  onEdit(banner: Banner) {
    this.isEditing = true;
    this.currentBanner = banner;
    this.bannerForm.patchValue({ ...banner, image: null });
    this.isOpen = true;
  }

  onDelete(banner: Banner) {
    if (confirm('Are you sure you want to delete this banner?')) {
      this.bannerservice.deleteBanner(banner).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  createBanner(banner: Banner) {
    if (!this.bannerImage) return;
    //ipload image
    // console.log(this.bannerImage);

    this.bannerservice
      .uploadImage(this.bannerImage)
      .pipe(
        switchMap((result) => {
          // console.log(result);

          if (!result || !result.pdt_img) return of(null);
          // console.log(result);
          banner.image = result.pdt_img;
          return this.bannerservice.addBanner(banner);
        })
      )
      .subscribe(() => this.resetVariables());
  }

  updateBanner(banner: Banner) {
    if (!this.currentBanner) return;
    if (!this.bannerImage) {
      this.bannerservice
        .updateBanner({
          ...banner,
          id: this.currentBanner.id,
          image: this.currentBanner.image,
        })
        .subscribe(() => this.resetVariables());
    }
    if (this.bannerImage) {
      this.bannerservice
        .uploadImage(this.bannerImage)
        .pipe(
          switchMap((result) => {
            if (!result || !result.pdt_img) return of(null);
            // console.log(result);
            banner.image = result.pdt_img;
            return this.bannerservice.updateBanner({
              ...banner,
              id: this.currentBanner?.id,
            });
          })
        )
        .subscribe(() => this.resetVariables());
    }
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.currentBanner = undefined;
    this.bannerForm.reset({
      // offertitle: '',
      // startdate: new Date(),
      // enddate: new Date(),
      // isofferactive: true,
      // minimumquantity: 1,
    });
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
