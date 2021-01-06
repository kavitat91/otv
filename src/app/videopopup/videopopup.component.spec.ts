import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideopopupComponent } from './videopopup.component';

describe('VideopopupComponent', () => {
  let component: VideopopupComponent;
  let fixture: ComponentFixture<VideopopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideopopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideopopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
