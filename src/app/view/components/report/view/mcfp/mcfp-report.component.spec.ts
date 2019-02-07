import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { McfpReportComponent } from './mcfp-report.component';

describe('AlertComponent', () => {
  let component: McfpReportComponent;
  let fixture: ComponentFixture<McfpReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ McfpReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McfpReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
