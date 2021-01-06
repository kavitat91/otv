import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcatalogComponent } from './showcatalog.component';

describe('ShowcatalogComponent', () => {
  let component: ShowcatalogComponent;
  let fixture: ComponentFixture<ShowcatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowcatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
