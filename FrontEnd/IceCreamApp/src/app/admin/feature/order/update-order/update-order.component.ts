import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/interfaces/order';
import { MessageService } from 'src/app/services/message.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent {
  faX = faX;
  orderForm: FormGroup;
  order: Order;

  constructor(
    public dialogRef: MatDialogRef<UpdateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order,
    private fb: FormBuilder,
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.order = data;

    this.orderForm = this.fb.group({
      name: [data.name, Validators.required],
      email: [data.email, Validators.required],
      amount: [data.amount, Validators.required],
      phone: [data.phone, Validators.required],
      paymentOption: [data.paymentOption, Validators.required],
      transactionStatus: [data.transactionStatus, Validators.required],
      address: [data.address, Validators.required],
      orderDate: [data.orderDate, Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const updateOrder: Order = this.orderForm.value;

      this.orderService.updateOrder(this.order.id, updateOrder).subscribe(() => {
        this.dialogRef.close(updateOrder);
        this.messageService.openSuccess('Order updated successfully');
      }, (error) => {
        this.messageService.openError('Failed to update order. Please try again');
      });
    }
  }
}
