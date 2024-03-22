import { Component, Inject } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';
import { Flavor } from 'src/app/interfaces/flavor';
import { ProductService } from 'src/app/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  faX = faX;
  productForm: FormGroup;
  flavors: Flavor[] = [];
  selectedImage: string = '';
  creating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddProductComponent>,
    private fb: FormBuilder,
    private productService: ProductService,
    private messageService: MessageService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required],
      flavorId: [0, Validators.required]
    });
  }

  ngOnInit(): void {
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
      const newProduct = this.productForm.value;
      this.creating = true;
      this.messageService.openInfo('Please wait for photo to upload');

      this.productService.createProduct(newProduct).subscribe(() => {
        this.dialogRef.close(newProduct);
        this.messageService.openSuccess('Product created successfully!');

      }, (error) => {
        this.messageService.openError('Failed to create product. Please try again');
      });
    }
  }
}
