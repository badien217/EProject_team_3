import { Component, Inject } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { Flavor } from 'src/app/interfaces/flavor';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  faX = faX;

  flavors: Flavor[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // Fetch flavors when the component is initialized
    this.productService.getAllFlavors().subscribe({
      next: (flavors) => {
        this.flavors = flavors;
      },
      error: (error) => {
        console.error('Error fetching flavors:', error);
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
