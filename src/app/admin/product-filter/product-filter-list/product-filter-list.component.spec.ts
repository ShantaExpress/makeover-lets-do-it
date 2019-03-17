import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFilterListComponent } from './product-filter-list.component';

describe('ProductFilterListComponent', () => {
  let component: ProductFilterListComponent;
  let fixture: ComponentFixture<ProductFilterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFilterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFilterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
