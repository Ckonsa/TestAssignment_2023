import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCheckoutComponent } from './change-checkout.component';

describe('ChangeCheckoutComponent', () => {
  let component: ChangeCheckoutComponent;
  let fixture: ComponentFixture<ChangeCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCheckoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
