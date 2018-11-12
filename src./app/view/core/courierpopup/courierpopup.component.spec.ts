import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierpopupComponent } from './courierpopup.component';

describe('AlertComponent', () => {
  let component: CourierpopupComponent;
  let fixture: ComponentFixture<CourierpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
