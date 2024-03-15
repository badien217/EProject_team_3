import { Component } from '@angular/core';
import { faYoutube, faFacebookF, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  faYoutube = faYoutube;
  faFacebook = faFacebookF;
  faTiktok = faTiktok;
  faInstagram = faInstagram;
}
