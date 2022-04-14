import { TestBed } from '@angular/core/testing';

import { ComboProductService } from './combo-product.service';

describe('ComboProductService', () => {
  let service: ComboProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComboProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
