import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  type: 'category' | 'subcategory' | 'servSub';

  constructor() {
    this.type = 'category';
  }
}
