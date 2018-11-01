import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierDocumentComponent } from './courier-document.component';

describe('CourierDocumentComponent', () => {
  let component: CourierDocumentComponent;
  let fixture: ComponentFixture<CourierDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
