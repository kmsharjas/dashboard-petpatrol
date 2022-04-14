import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';
import { Event } from 'src/app/model/event.model';
import { State, Country } from 'src/app/model/state.model';
import { EventService } from 'src/app/services/event.service';
import { OtherService } from 'src/app/services/other.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
  isOpen = false;
  isEditing = false;

  refresh$ = new BehaviorSubject(true);

  events?: Blog[];

  dataSource = new MatTableDataSource<Blog>();
  displayColoumns = ['title', 'actions'];

  // displayColoumns = ['name', 'price', 'offer', 'actions'];
  img: any;
  eventForm: FormGroup;
  currentEvent?: Blog;
  eventImage?: File;
  unit: any;
  states$: Observable<State[]>;
  countries$: Observable<Country[]>;
  countries;
  constructor(
    private eventservice: EventService,
    private otherservice: OtherService,
    private fb: FormBuilder
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      // createdAt: [new Date(), Validators.required],
      place: ['', Validators.required],
      pin: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      image: [null],
      para1: ['', Validators.required],
      para2: ['', Validators.required],
    });
  }

  get f() {
    return this.eventForm.controls;
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.eventservice.getEvents()))
      .subscribe((events) => {
        // // console.log(events);

        this.events = events;
        this.dataSource = new MatTableDataSource<Event>(events);
      });

    this.states$ = this.otherservice.getStates();
    this.countries = this.otherservice.getCountries();
  }

  onSubmit() {
    const event = this.eventForm.value;
    this.isEditing ? this.updateProduct(event) : this.createProduct(event);
  }

  onEdit(event: Event) {
    this.isEditing = true;
    this.currentEvent = event;
    this.eventForm.patchValue({ ...event, image: null });
    this.isOpen = true;
  }

  onDelete(event: Event) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventservice.deleteEvent(event).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  onFileChange(event: any) {
    if (!event.target.files && !event.target.files.length) return;
    const [file] = event.target.files;
    this.eventImage = file;
  }

  createProduct(event: Event) {
    if (!this.eventImage) return;
    //ipload image
    // // console.log(this.eventImage);

    this.eventservice
      .uploadImage(this.eventImage)
      .pipe(
        switchMap((result) => {
          // // console.log(result);

          if (!result || !result.pdt_img) return of(null);
          // // console.log(result);
          event.image = result.pdt_img;
          return this.eventservice.addEvent(event);
        })
      )
      .subscribe(() => this.resetVariables());
  }

  updateProduct(event: Event) {
    if (!this.currentEvent) return;
    if (!this.eventImage) {
      this.eventservice
        .updateEvent({
          ...event,
          id: this.currentEvent.id,
          image: this.currentEvent.image,
        })
        .subscribe(() => this.resetVariables());
    }
    if (this.eventImage) {
      this.eventservice
        .uploadImage(this.eventImage)
        .pipe(
          switchMap((result) => {
            if (!result || !result.pdt_img) return of(null);
            // // console.log(result);
            event.image = result.pdt_img;
            return this.eventservice.updateEvent({
              ...event,
              id: this.currentEvent?.id,
            });
          })
        )
        .subscribe(() => this.resetVariables());
    }
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.eventImage = undefined;
    this.eventForm.reset();
    this.refresh$.next(true);
  }
  // disable enter key for the form
  onKeydown(event) {
    // // console.log(event);
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
}
