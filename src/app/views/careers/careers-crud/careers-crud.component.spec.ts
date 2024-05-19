import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersCrudComponent } from './careers-crud.component';

describe('CareersCrudComponent', () => {
  let component: CareersCrudComponent;
  let fixture: ComponentFixture<CareersCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareersCrudComponent]
    });
    fixture = TestBed.createComponent(CareersCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
