import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;

  page: number = 1;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  iceCreams: Product[] = [];

  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.productService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Product[]) => {
        this.iceCreams = data;
        console.log(this.iceCreams);
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
