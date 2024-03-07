import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Order } from 'src/app/interfaces/order';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<UpdateOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
