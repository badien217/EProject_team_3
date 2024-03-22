import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Flavor } from 'src/app/interfaces/flavor';
import { Product } from 'src/app/interfaces/product';
import { MessageService } from 'src/app/services/message.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  faX = faX;
  productForm: FormGroup;
  product: Product;
  flavors: Flavor[] = [];
  selectedImage: string = '';
  updating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.product = data;

    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      imageUrl: [data.imageUrl, Validators.required],
      flavorId: [data.flavorId, Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch flavors when the component is initialized
    this.productService.getAllFlavors().subscribe({
      next: (flavors) => {
        this.flavors = flavors;
      },
      error: (error) => this.messageService.openError('Flavor data retrieval error')
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);

      this.productForm.patchValue({
        imageUrl: file,
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const updateProduct = this.productForm.value;
      this.updating = true;
      this.messageService.openInfo('Please wait for photo to upload');

      this.productService.updateProduct(this.product.id, updateProduct).subscribe(() => {
        this.dialogRef.close(updateProduct);
        this.messageService.openSuccess('Product updated successfully');
      }, (error) => {
        this.messageService.openError('Failed to update product. Please try again');
      });
    }
  }
}
