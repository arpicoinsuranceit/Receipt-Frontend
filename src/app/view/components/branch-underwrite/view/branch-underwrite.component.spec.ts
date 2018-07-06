import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUnderwriteComponent } from './branch-underwrite.component';

describe('BranchUnderwriteComponent', () => {
  let component: BranchUnderwriteComponent;
  let fixture: ComponentFixture<BranchUnderwriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchUnderwriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUnderwriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
