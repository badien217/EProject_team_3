import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../interfaces/order';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  orders: Order[] = [];
  page: number = 1;
  
  currentOrder: Order = {};
  currentIndex = -1;
  title = '';

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.retrieveOrders();
  }

  retrieveOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}