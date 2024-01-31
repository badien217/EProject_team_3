import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular';

  
  constructor(private router: Router) { }
  // ngOnInit() {
  //   this.router.events.subscribe((evt) => {
  //     if (!(evt instanceof NavigationEnd)) {
  //       return;
  //     }
  //     window.scrollTo(0, 0);
  //   });
  // }
  get isAuthRoute() {
    return this.router.url.startsWith('/auth');
  }

  get isAdminRoute() {
    return this.router.url.startsWith('/admin');
  }
}
