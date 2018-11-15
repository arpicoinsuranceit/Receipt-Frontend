import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierPendingComponent } from './courier-pending.component';

describe('CourierPendingComponent', () => {
  let component: CourierPendingComponent;
  let fixture: ComponentFixture<CourierPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
