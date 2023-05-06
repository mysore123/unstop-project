import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDisplayComponent } from './seat-display.component';

describe('SeatDisplayComponent', () => {
  let component: SeatDisplayComponent;
  let fixture: ComponentFixture<SeatDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
