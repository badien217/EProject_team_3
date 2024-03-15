import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent {
  public chart: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe(orders => {
      const successCount = orders.filter(order => order.transactionStatus).length;
      const failureCount = orders.length - successCount;

      this.createChart(successCount, failureCount);
    });
  }

  createChart(successCount: number, failureCount: number) {
    this.chart = new Chart("DonutChart", {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Failure'],
        datasets: [{
          data: [successCount, failureCount],
          backgroundColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)'], // Green for success, red for failure
          hoverOffset: 5
        }]
      },
      options: {
        // aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'Order Transaction Status',
            font: {
              size: 24,
              weight: 'bold',
              family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
            },
            padding: {
              top: 10,
              bottom: 30
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
                family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"
              }
            }
          }
        }
      }
    });
  }
}
