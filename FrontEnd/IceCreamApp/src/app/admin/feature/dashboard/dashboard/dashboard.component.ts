import { Component, OnInit } from '@angular/core';
import { faIceCream, faUser, faCartShopping, faComment, faBook, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { DashboardService } from 'src/app/admin/core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  faIceCream = faIceCream;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faComment = faComment;
  faBook = faBook;
  faBookOpen = faBookOpen;

  totalFeedback: number = 0;
  totalRecipes: number = 0;
  totalUsers: number = 0;
  totalOrders: number = 0;
  totalProducts: number = 0;
  totalBooks: number = 0;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getTotalFeedbacks().subscribe({
      next: (data) => {
        this.totalFeedback = data;
      },
      error: (e) => console.error(e)
    });

    this.dashboardService.getTotalRecipes().subscribe({
      next: (data) => {
        this.totalRecipes = data;
      },
      error: (e) => console.error(e)
    });

    this.dashboardService.getTotalUsers().subscribe({
      next: (data) => {
        this.totalUsers = data;
      },
      error: (e) => console.error(e)
    });

    this.dashboardService.getTotalOrders().subscribe({
      next: (data) => {
        this.totalOrders = data;
      },
      error: (e) => console.error(e)
    });

    this.dashboardService.getTotalBooks().subscribe({
      next: (data) => {
        this.totalBooks = data;
      },
      error: (e) => console.error(e)
    });

    this.dashboardService.getTotalProducts().subscribe({
      next: (data) => {
        this.totalProducts = data;
      },
      error: (e) => console.error(e)
    });

  }
}
