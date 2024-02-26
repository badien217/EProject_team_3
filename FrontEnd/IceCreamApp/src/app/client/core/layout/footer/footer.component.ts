import { Component, HostListener } from '@angular/core';
import { faYoutube, faFacebookF, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  faYoutube = faYoutube;
  faFacebook = faFacebookF;
  faTiktok = faTiktok;
  faInstagram = faInstagram;
  faLocationDot = faLocationDot;
  faPhone = faPhone;
  faEnvelope = faEnvelope;

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 100 ? true : false;
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
