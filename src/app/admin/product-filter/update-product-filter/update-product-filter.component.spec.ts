import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductFilterComponent } from './update-product-filter.component';

describe('UpdateProductFilterComponent', () => {
  let component: UpdateProductFilterComponent;
  let fixture: ComponentFixture<UpdateProductFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
