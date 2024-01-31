import { Component } from '@angular/core';
import { faMagnifyingGlass, faUser, faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  faCartShopping = faCartShopping;
  faBars = faBars;
}
