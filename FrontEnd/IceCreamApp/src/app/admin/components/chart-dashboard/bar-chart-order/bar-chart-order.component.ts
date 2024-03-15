import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-bar-chart-order',
  templateUrl: './bar-chart-order.component.html',
  styleUrls: ['./bar-chart-order.component.css']
})
export class BarChartOrderComponent {
  orders: Order[] = []; // Initialize orders array

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

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

  public chart: any;

  createChart() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysOfMonth = this.getDaysArray(firstDayOfMonth, lastDayOfMonth);

    const orderQuantities = daysOfMonth.map(day => {
      const dayOrders = this.orders.filter(order => new Date(order.orderDate).getDate() === day.getDate());
      return dayOrders.reduce((acc, cur) => acc + cur.orderDetails.reduce((acc, cur) => acc + cur.quantity, 0), 0);
    });

    this.chart = new Chart("BarChartOrder", {
      type: 'bar',
      data: {
        labels: daysOfMonth.map(date => date.getDate()), // Use only day numbers
        datasets: [
          {
            label: "Order Quantity",
            data: orderQuantities,
            backgroundColor: "rgba(255, 99, 132, 0.7)",
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
              display: false // Hide X-axis grid lines for cleaner look
            },
            ticks: {
              font: {
                size: 12
              },
              // Rotate the x-axis labels
              maxRotation: 0,
              minRotation: 0
            }
          },
          y: {
            grid: {
              color: 'rgba(0, 0, 0, 0.2)', // Add a light grey color to Y-axis grid lines
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

  getDaysArray(start: Date, end: Date) {
    const daysArray = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      daysArray.push(new Date(d));
    }
    return daysArray;
  }
}