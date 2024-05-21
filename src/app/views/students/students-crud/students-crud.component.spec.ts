import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsCrudComponent } from './students-crud.component';

describe('StudentsCrudComponent', () => {
  let component: StudentsCrudComponent;
  let fixture: ComponentFixture<StudentsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsCrudComponent]
    });
    fixture = TestBed.createComponent(StudentsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
