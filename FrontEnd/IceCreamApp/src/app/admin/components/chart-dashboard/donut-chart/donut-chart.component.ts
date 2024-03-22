import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements OnInit {
  public chart: any;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    // Fetch all orders from OrderService and create the chart
    this.orderService.getAllOrders().subscribe(orders => {
      // Count the number of successful and failed transactions
      const successCount = orders.filter(order => order.transactionStatus).length;
      const failureCount = orders.length - successCount;

      // Create the donut chart with the counts of successful and failed transactions
      this.createChart(successCount, failureCount);
    });
  }

  // Method to create the donut chart
  createChart(successCount: number, failureCount: number) {
    this.chart = new Chart("DonutChart", {
      type: 'doughnut',
      data: {
        labels: ['Success', 'Failure'],
        datasets: [{
          data: [successCount, failureCount],
          backgroundColor: ['rgb(255, 205, 86)', 'rgb(75, 192, 192)'],
          hoverOffset: 5
        }]
      },
      options: {
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
