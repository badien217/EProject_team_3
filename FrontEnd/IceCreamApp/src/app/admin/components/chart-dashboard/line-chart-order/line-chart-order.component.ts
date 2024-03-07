import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-line-chart-order',
  templateUrl: './line-chart-order.component.html',
  styleUrls: ['./line-chart-order.component.css']
})
export class LineChartOrderComponent {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  public chart: any;
  public orders: Order[] = [];

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.createChart();
      },
      (error) => {
        console.log('Error fetching orders:', error);
      }
    );
  }

  createChart() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysOfMonth = this.getDaysArray(firstDayOfMonth, lastDayOfMonth);

    const orderAmounts = daysOfMonth.map(day => {
      const dayOrders = this.orders.filter(order => new Date(order.orderDate).getDate() === day.getDate());
      return dayOrders.reduce((acc, cur) => acc + cur.amount, 0);
    });

    this.chart = new Chart("LineChartOrder", {
      type: 'line',
      data: {
        labels: daysOfMonth.map((_, index) => index + 1), // Assuming you want day numbers as labels
        datasets: [
          {
            label: "Total Amount",
            data: orderAmounts,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            pointBackgroundColor: 'rgb(255, 99, 132)',
          }
        ]
      },
      options: {
        // aspectRatio: 2.5,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          },
          x: {
            grid: {
              color: 'rgba(0, 0, 0, 0.1)',
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: "Amount of Orders for Current Month",
            font: {
              size: 24,
              weight: 'bold',
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            bodyFont: {
              size: 14,
            },
            titleFont: {
              size: 16,
              weight: 'bold',
            }
          },
          legend: {
            labels: {
              font: {
                size: 14,
              }
            }
          }
        }
      }
    });
  }

  getDaysArray(start: Date, end: Date) {
    const daysArray = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      daysArray.push(new Date(d));
    }
    return daysArray;
  }
}
