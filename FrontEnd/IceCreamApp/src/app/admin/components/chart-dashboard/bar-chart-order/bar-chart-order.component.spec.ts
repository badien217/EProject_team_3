import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartOrderComponent } from './bar-chart-order.component';

describe('BarChartOrderComponent', () => {
  let component: BarChartOrderComponent;
  let fixture: ComponentFixture<BarChartOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BarChartOrderComponent]
    });
    fixture = TestBed.createComponent(BarChartOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
