import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllitemslistComponent } from './allitemslist.component';

describe('AllitemslistComponent', () => {
  let component: AllitemslistComponent;
  let fixture: ComponentFixture<AllitemslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllitemslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllitemslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
