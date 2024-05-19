import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudFooterComponent } from './crud-footer.component';

describe('CrudFooterComponent', () => {
  let component: CrudFooterComponent;
  let fixture: ComponentFixture<CrudFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrudFooterComponent]
    });
    fixture = TestBed.createComponent(CrudFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
