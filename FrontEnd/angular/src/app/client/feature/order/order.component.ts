import { Component } from '@angular/core';
import { faXmark, faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  faXmark=faXmark;
  faAngleRight=faAngleRight;
}
