import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Flavor } from 'src/app/interfaces/flavor';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  faX = faX;

  flavors: Flavor[] = [];

  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
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
