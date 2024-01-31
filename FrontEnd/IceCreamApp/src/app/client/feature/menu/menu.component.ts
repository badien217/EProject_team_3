import { Component, OnInit } from '@angular/core';
import { faStar, faStarHalfStroke} from '@fortawesome/free-solid-svg-icons'
import { Subject, takeUntil } from 'rxjs';
import { Flavor } from 'src/app/interfaces/flavor';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit {
  // cardIndexes = Array(3).fill(0).map((_, i) => i);
  faStar = faStar;
  faStarHalfStroke=faStarHalfStroke;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  iceCreams: Product[] = [];
  flavors: Flavor[] = [];

  constructor(private productService: ProductService) { }


  ngOnInit() {
    this.productService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Product[]) => {
        this.iceCreams = data;
        console.log(this.iceCreams);
      }
    );

    this.productService.getAllFlavors().pipe(takeUntil(this.destroy$)).subscribe(
      (data: Flavor[]) => {
        this.flavors = data;
        console.log(this.flavors);
      }
    );
  }

  getFlavorName(flavorId: number): string | undefined {
    const flavor = this.flavors.find(f => f.id === flavorId);
    return flavor ? flavor.name : undefined;
  }
  

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
