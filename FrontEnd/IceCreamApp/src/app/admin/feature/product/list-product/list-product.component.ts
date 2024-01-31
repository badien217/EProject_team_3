import { Component } from '@angular/core';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FlavorService } from 'src/app/admin/core/services/flavor.service';
import { Flavor } from 'src/app/interfaces/flavor';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
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
