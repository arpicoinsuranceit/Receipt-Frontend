import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderwriteComponent } from './underwrite.component';

describe('UnderwriteComponent', () => {
  let component: UnderwriteComponent;
  let fixture: ComponentFixture<UnderwriteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderwriteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderwriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
