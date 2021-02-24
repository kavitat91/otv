import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RazorpayresponseComponent } from './razorpayresponse.component';

describe('RazorpayresponseComponent', () => {
  let component: RazorpayresponseComponent;
  let fixture: ComponentFixture<RazorpayresponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazorpayresponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RazorpayresponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
