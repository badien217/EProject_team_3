import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Order } from 'src/app/interfaces/order';
import { MessageService } from 'src/app/services/message.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bar-chart-order',
  templateUrl: './bar-chart-order.component.html',
  styleUrls: ['./bar-chart-order.component.css']
})
export class BarChartOrderComponent {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetches orders from the OrderService
  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
        this.createChart();
      },
      (error) => {
        this.messageService.openError('Orders data retrieval error');
      }
    );
  }

  public chart: any;

  createChart() {
    // Get current date and first and last day of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Generate array of dates for the current month
    const daysOfMonth = this.getDaysArray(firstDayOfMonth, lastDayOfMonth);

    // Calculate order quantities for each day of the month
    const orderQuantities = daysOfMonth.map(day => {
      const dayOrders = this.orders.filter(order => new Date(order.orderDate).getDate() === day.getDate());
      return dayOrders.reduce((acc, cur) => acc + cur.orderDetails.reduce((acc, cur) => acc + cur.quantity, 0), 0);
    });

    this.chart = new Chart("BarChartOrder", {
      type: 'bar',
      data: {
        labels: daysOfMonth.map(date => date.getDate()),
        datasets: [
          {
            label: "Order Quantity",
            data: orderQuantities,
            backgroundColor: "rgba(50, 142, 253,0.7)",
          }
        ]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: "Order Quantity by Date",
            font: {
              size: 24,
              weight: 'bold',
            }
          },
          legend: {
            display: true,
            labels: {
              font: {
                size: 14,
              }
            }
          },
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 12
              },
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.2)',
            },
            ticks: {
              font: {
                size: 12
              },
            }
          }
        }
      }
    });
  }

  // Utility function to generate an array of dates between two given dates
  getDaysArray(start: Date, end: Date) {
    const daysArray = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      daysArray.push(new Date(d));
    }
    return daysArray;
  }
}
