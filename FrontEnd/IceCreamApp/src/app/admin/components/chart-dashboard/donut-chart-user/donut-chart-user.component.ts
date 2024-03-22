import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { UserService } from 'src/app/admin/core/services/user.service';

@Component({
  selector: 'app-donut-chart-user',
  templateUrl: './donut-chart-user.component.html',
  styleUrls: ['./donut-chart-user.component.css']
})
export class DonutChartUserComponent implements OnInit {
  public chart: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // Fetch all users from UserService and create the chart
    this.userService.getAllUsers().subscribe(users => {
      // Count the number of users with monthly and yearly subscriptions
      const monthlyCount = users.filter(user => user.subscriptionType === 'monthly').length;
      const yearlyCount = users.filter(user => user.subscriptionType === 'yearly').length;

      // Create the donut chart with the counts of monthly and yearly subscribers
      this.createChart(monthlyCount, yearlyCount);
    });
  }

  // Method to create the donut chart
  createChart(monthlyCount: number, yearlyCount: number) {
    this.chart = new Chart("DonutChartUser", {
      type: 'doughnut',
      data: {
        labels: ['Monthly', 'Yearly'],
        datasets: [{
          data: [monthlyCount, yearlyCount],
          backgroundColor: ['#ff7a1e', '#a9ce36'],
          hoverOffset: 4
        }]
      },
      options: {
        aspectRatio: 2.5,
        plugins: {
          title: {
            display: true,
            text: 'User Subscription Types',
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
