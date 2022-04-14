import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<Event[]>(`${this.apiRoot}/listevent`);
  }

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('pdt_img', image);
    return this.http.post<{ img_id: string; pdt_img: string }>(
      `${this.apiRoot}/addproductsimages`,
      formData
    );
  }

  addEvent(blog: Event) {
    return this.http.post(`${this.apiRoot}/createevent`, blog);
  }

  updateEvent(blog: Event) {
    // console.log(blog);

    const { id, ...data } = blog;
    return this.http.put(`${this.apiRoot}/updateevent/${id}`, data);
  }

  deleteEvent(blog: Event) {
    const { id } = blog;
    return this.http.delete(`${this.apiRoot}/deleteevent/${id}`);
  }
}
