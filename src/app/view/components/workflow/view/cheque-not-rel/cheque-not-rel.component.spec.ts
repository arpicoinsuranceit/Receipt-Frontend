import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeNotRelComponent } from './cheque-not-rel.component';

describe('ChequeNotRelComponent', () => {
  let component: ChequeNotRelComponent;
  let fixture: ComponentFixture<ChequeNotRelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeNotRelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeNotRelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
