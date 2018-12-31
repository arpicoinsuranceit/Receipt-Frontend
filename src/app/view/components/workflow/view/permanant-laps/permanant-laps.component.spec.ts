import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermanantLapsComponent } from './permanant-laps.component';

describe('PermanantLapsComponent', () => {
  let component: PermanantLapsComponent;
  let fixture: ComponentFixture<PermanantLapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermanantLapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermanantLapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
