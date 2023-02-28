import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBookComponent } from './change-book.component';

describe('ChangeBookComponent', () => {
  let component: ChangeBookComponent;
  let fixture: ComponentFixture<ChangeBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBookComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
