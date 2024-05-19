import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksCrudComponent } from './books-crud.component';

describe('BooksCrudComponent', () => {
  let component: BooksCrudComponent;
  let fixture: ComponentFixture<BooksCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BooksCrudComponent]
    });
    fixture = TestBed.createComponent(BooksCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
