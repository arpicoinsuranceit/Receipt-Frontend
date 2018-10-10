import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardpopupComponent } from './dashboardpopup.component';

describe('DashboardpopupComponent', () => {
  let component: DashboardpopupComponent;
  let fixture: ComponentFixture<DashboardpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
