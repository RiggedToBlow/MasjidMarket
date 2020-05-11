import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartBillDialogComponent } from './cart-bill-dialog.component';

describe('CartBillDialogComponent', () => {
  let component: CartBillDialogComponent;
  let fixture: ComponentFixture<CartBillDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartBillDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartBillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
