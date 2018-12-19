import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselSetComponent } from './carousel-set.component';

describe('CarouselSetComponent', () => {
  let component: CarouselSetComponent;
  let fixture: ComponentFixture<CarouselSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
