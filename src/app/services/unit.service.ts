import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Unit } from '../model/unit.model';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  apiRoot = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getUnits() {
    return this.http.get<Unit[]>(`${this.apiRoot}/listunits`);
  }
}
