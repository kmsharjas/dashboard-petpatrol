import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter,
} from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  envApiRoot: string = environment.apiBaseUrl;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    // sessionStorage.removeItem('token');
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    // console.log(username, password);

    this.auth.login(username, password).subscribe((res) => {
      if (res) this.router.navigate(['/']);
    });
  }
}
