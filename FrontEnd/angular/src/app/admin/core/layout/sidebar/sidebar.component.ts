import { Component } from '@angular/core';
import { faHouse, faIceCream, faUser, faCartShopping, faComment, faBook, faPowerOff, faBookOpen, faComments} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  faHouse = faHouse;
  faIceCream = faIceCream;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faComment = faComment;
  faBook = faBook;
  faPowerOff = faPowerOff;
  faBookOpen=faBookOpen;
  faComments = faComments;
}
