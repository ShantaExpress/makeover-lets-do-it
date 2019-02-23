import { TestBed, inject } from '@angular/core/testing';

import { ProductHelperService } from './product-helper.service';

describe('ProductHelperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductHelperService]
    });
  });

  it('should be created', inject([ProductHelperService], (service: ProductHelperService) => {
    expect(service).toBeTruthy();
  }));
});
