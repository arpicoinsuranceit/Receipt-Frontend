import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsOfPoliciesReportComponent } from './details-of-policies-report.component';

describe('AlertComponent', () => {
  let component: DetailsOfPoliciesReportComponent;
  let fixture: ComponentFixture<DetailsOfPoliciesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsOfPoliciesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsOfPoliciesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
