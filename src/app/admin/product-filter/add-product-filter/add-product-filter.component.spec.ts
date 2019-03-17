import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFilterComponent } from './add-product-filter.component';

describe('AddProductFilterComponent', () => {
  let component: AddProductFilterComponent;
  let fixture: ComponentFixture<AddProductFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
