import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortPremiumComponent } from './short-premium.component';

describe('ShortPremiumComponent', () => {
  let component: ShortPremiumComponent;
  let fixture: ComponentFixture<ShortPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShortPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
