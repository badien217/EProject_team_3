import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartOrderComponent } from './line-chart-order.component';

describe('LineChartOrderComponent', () => {
  let component: LineChartOrderComponent;
  let fixture: ComponentFixture<LineChartOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LineChartOrderComponent]
    });
    fixture = TestBed.createComponent(LineChartOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
