import { Component } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  faArrowLeft =faArrowLeft;

  // product: IceCream = {
  //   name: '',
  //   flavorId: 0,
  //   imageUrl: '',
  // };
  // submitted = false;

  // constructor(private productService: ProductService) { }

  // saveProduct(): void {
  //   const data = {
  //     name: this.product.name,
  //     flavorId: this.product.flavorId,
  //     imageUrl: this.product.imageUrl,
  //   };

  //   this.productService.createProduct(data).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //       this.submitted = true;
  //     },
  //     error: (e) => console.error(e)
  //   });
  // }

  // newProduct(): void {
  //   this.submitted = false;
  //   this.product = {
  //     name: '',
  //     flavorId: 0,
  //     imageUrl: '',
  //   };
  // }
}
