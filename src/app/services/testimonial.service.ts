import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Testimonial } from '../model/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getTestimonials() {
    return this.http.get<Testimonial[]>(`${this.apiRoot}/listtestimonial`);
  }

  addTestimonial(blog: Testimonial) {
    return this.http.post(`${this.apiRoot}/createtestimonial`, blog);
  }

  updateTestimonial(testimonial: Testimonial) {
    // console.log(testimonial);

    const { id, ...data } = testimonial;
    return this.http.put(`${this.apiRoot}/updatetestimonial/${id}`, data);
  }

  deleteTestimonial(testimonial: Testimonial) {
    const { id } = testimonial;
    return this.http.delete(`${this.apiRoot}/deletetestimonial/${id}`);
  }
}
