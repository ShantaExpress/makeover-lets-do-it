import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionalCategoryComponent } from './sectional-category.component';

describe('SectionalCategoryComponent', () => {
  let component: SectionalCategoryComponent;
  let fixture: ComponentFixture<SectionalCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionalCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
