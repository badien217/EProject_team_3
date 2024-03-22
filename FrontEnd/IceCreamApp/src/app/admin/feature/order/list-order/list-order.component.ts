import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/interfaces/order';
import { OrderService } from 'src/app/services/order.service';
import { UpdateOrderComponent } from '../update-order/update-order.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>();
  displayedColumns: string[] = ['index', 'name', 'email', 'phone', 'amount', 'paymentOption', 'transactionStatus', 'orderDate', 'address', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(private orderService: OrderService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.retrieveOrders();
  }

  retrieveOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Order>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => this.messageService.openError('Order data retrieval error')
    });
  }

  getIndex(row: Order): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }


  openUpdateOrderDialog(order: Order): void {
    const dialogRef = this.dialog.open(UpdateOrderComponent, {
      data: {
        id: order.id,
        name: order.name,
        email: order.email,
        phone: order.phone,
        address: order.address,
        amount: order.amount,
        paymentOption: order.paymentOption,
        transactionStatus: order.transactionStatus,
        orderDate: order.orderDate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveOrders();
    });
  }

  deleteOrder(orderId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this order? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.orderService.deleteOrder(orderId).subscribe(() => {
          this.retrieveOrders();

          this.messageService.openSuccess('Order deleted successfully');
        }, (error) => {
          this.messageService.openError('Failed to delete order. Please try again later');
        });
      }
    });
  }


}
