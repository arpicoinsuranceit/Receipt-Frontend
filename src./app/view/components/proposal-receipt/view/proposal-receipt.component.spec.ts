import { ProposalReceiptComponent } from './proposal-receipt.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';


describe('QuotationReceiptComponent', () => {
  let component: ProposalReceiptComponent;
  let fixture: ComponentFixture<ProposalReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
