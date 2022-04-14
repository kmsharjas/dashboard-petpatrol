import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboProductsComponent } from './combo-products.component';

describe('ComboProductsComponent', () => {
  let component: ComboProductsComponent;
  let fixture: ComponentFixture<ComboProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
