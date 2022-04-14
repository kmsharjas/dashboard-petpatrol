import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { District, State } from 'src/app/model/state.model';
import { AdminUser, Designation } from 'src/app/model/user.model';
import { OtherService } from 'src/app/services/other.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  isOpen = false;
  isEditing = false;
  refresh$ = new BehaviorSubject(true);
  users?: AdminUser[];
  dataSource = new MatTableDataSource<AdminUser>();
  displayColoumns = ['sl', 'name', 'email', 'mobile', 'Type', 'actions'];
  userForm: FormGroup;
  currentUser?: AdminUser;
  districts$: Observable<District[]>;
  states$: Observable<State[]>;
  designations$: Observable<Designation[]>;
  constructor(
    private userservice: UserService,
    private fb: FormBuilder,
    private otherservice: OtherService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile_no: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      desig_id: ['', Validators.required],
      addr_line1: ['', Validators.required],
      addr_line2: ['', Validators.required],
      addr_line3: ['', Validators.required],
      pincode: ['', Validators.required],
      district: ['', Validators.required],
      state: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.refresh$
      .pipe(switchMap(() => this.userservice.getUsers()))
      .subscribe((users) => {
        this.users = users;
        this.dataSource = new MatTableDataSource<AdminUser>(users);
      });

    this.districts$ = this.otherservice.getDistrict();
    this.states$ = this.otherservice.getStates();
    this.designations$ = this.otherservice.getDesignation();
  }

  onSubmit() {
    // const user: AdminUser = this.userForm.value;
    const adminUser: AdminUser = this.userForm.value;
    // console.log(adminUser);

    // set date format to yyyy-mm-dd
    // offer.startdate = formatDate(offer.startdate, 'yyyy-MM-dd', 'en');
    // offer.enddate = formatDate(offer.enddate, 'yyyy-MM-dd', 'en');
    this.isEditing ? this.updateUser(adminUser) : this.createUser(adminUser);
  }

  onEdit(user: AdminUser) {
    this.isEditing = true;
    this.currentUser = user;
    this.userForm.patchValue(user);
    this.isOpen = true;
  }

  onDelete(user: AdminUser) {
    if (confirm('Are you sure you want to delete this offer?')) {
      this.userservice.deleteUser(user).subscribe(() => {
        this.refresh$.next(true);
      });
    }
  }

  createUser(user: AdminUser) {
    this.userservice.addUser(user).subscribe(() => this.resetVariables());
  }

  updateUser(user: AdminUser) {
    if (!this.currentUser) return;
    this.userservice
      .updateUser({ ...user, id: this.currentUser.id })
      .subscribe(() => this.resetVariables());
  }

  resetVariables() {
    this.isOpen = false;
    this.isEditing = false;
    this.currentUser = undefined;
    this.userForm.reset({
      // offertitle: '',
      // startdate: new Date(),
      // enddate: new Date(),
      // isofferactive: true,
      // minimumquantity: 1,
    });
    this.refresh$.next(true);
  }
}
