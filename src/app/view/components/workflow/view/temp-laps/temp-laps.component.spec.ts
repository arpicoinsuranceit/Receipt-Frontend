import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempLapsComponent } from './temp-laps.component';

describe('TempLapsComponent', () => {
  let component: TempLapsComponent;
  let fixture: ComponentFixture<TempLapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempLapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempLapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
