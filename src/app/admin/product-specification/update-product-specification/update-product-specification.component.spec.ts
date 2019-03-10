import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductSpecificationComponent } from './update-product-specification.component';

describe('UpdateProductSpecificationComponent', () => {
  let component: UpdateProductSpecificationComponent;
  let fixture: ComponentFixture<UpdateProductSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProductSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
