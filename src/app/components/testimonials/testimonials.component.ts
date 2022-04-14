import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Offer } from 'src/app/model/offer.model';
import { Testimonial } from 'src/app/model/testimonial.model';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  testimonials?: Testimonial[];
  dataSource = new MatTableDataSource<Testimonial>();
  displayColoumns = ['name', 'customerName', 'show', 'actions'];

  testimonialForm: FormGroup;
  currentTestimonial?: Testimonial;

  constructor(
    private testimonialService: TestimonialService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.testimonialService.getTestimonials()))
      .subscribe((testimonials) => {
        this.testimonials = testimonials;
        this.dataSource = new MatTableDataSource<Testimonial>(testimonials);
      });
  }

  toggleShow(testimonial: Testimonial) {
    testimonial.isShown = !testimonial.isShown;
    this.testimonialService.updateTestimonial(testimonial).subscribe(() => {
      this.refresh$.next(true);
    });
  }

  onDelete(testimonial: Testimonial) {
    if (confirm('Are you sure you want to delete this Testimonial?')) {
      this.testimonialService.deleteTestimonial(testimonial).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }
}
