import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierReceiveableComponent } from './courier-receiveable.component';

describe('CourierReceiveableComponent', () => {
  let component: CourierReceiveableComponent;
  let fixture: ComponentFixture<CourierReceiveableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierReceiveableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierReceiveableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
