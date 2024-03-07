import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonutChartUserComponent } from './donut-chart-user.component';

describe('DonutChartUserComponent', () => {
  let component: DonutChartUserComponent;
  let fixture: ComponentFixture<DonutChartUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonutChartUserComponent]
    });
    fixture = TestBed.createComponent(DonutChartUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
