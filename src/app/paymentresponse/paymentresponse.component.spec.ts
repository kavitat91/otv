import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentresponseComponent } from './paymentresponse.component';

describe('PaymentresponseComponent', () => {
  let component: PaymentresponseComponent;
  let fixture: ComponentFixture<PaymentresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
