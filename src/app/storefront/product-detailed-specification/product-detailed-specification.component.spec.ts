import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailedSpecificationComponent } from './product-detailed-specification.component';

describe('ProductDetailedSpecificationComponent', () => {
  let component: ProductDetailedSpecificationComponent;
  let fixture: ComponentFixture<ProductDetailedSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductDetailedSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailedSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
