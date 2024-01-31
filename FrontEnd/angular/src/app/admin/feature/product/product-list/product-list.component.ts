import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../interfaces/product';
import { Flavor } from '../../../../interfaces/flavor';
import { FlavorService } from '../../../../services/flavor.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  faTrash = faTrash;
  faPenToSquare = faPenToSquare;

  products: Product[] = [];
  page: number = 1;
  
  flavors: Flavor[] = [];
  currentProduct: Product = {};
  currentIndex = -1;
  title = '';

  constructor(private productService: ProductService,private flavorService: FlavorService) { }

  // ngOnInit(): void {
  //   this.productService.getAllProducts().subscribe({
  //     next: (data) => {
  //       this.products = data;
  //       console.log(data);
  //     },
  //     error: (e) => console.error(e)
  //   });

  // }



  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.flavorService.getAllFlavors().subscribe((flavors) => {
        this.products = products.map((product) => ({
          ...product,
          flavorName: flavors.find((flavor) => flavor.id === product.flavorId)?.name,
        }));
      });
    });
  }

}

