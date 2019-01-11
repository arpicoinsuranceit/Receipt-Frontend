import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwriteConfirmationAlertComponent } from './underwrite-confirmation-alert.component';

describe('UnderwriteConfirmationComponent', () => {
  let component: UnderwriteConfirmationAlertComponent;
  let fixture: ComponentFixture<UnderwriteConfirmationAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwriteConfirmationAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwriteConfirmationAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
