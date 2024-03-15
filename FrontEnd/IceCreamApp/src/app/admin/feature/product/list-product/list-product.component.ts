import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatDialog } from '@angular/material/dialog';
import { Flavor } from 'src/app/interfaces/flavor';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Product> = new MatTableDataSource<Product>();
  displayedColumns: string[] = ['index', 'name', 'flavor', 'image', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';
  flavors: Flavor = { id: 0, name: "", imageUrl: "" };

  constructor(private productService: ProductService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  retrieveProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Product>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (e) => console.error(e),
    });
  }

  getIndex(row: Product): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: { name: '', imageUrl: '', flavorId: 0, flavor: this.flavors }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.flavorId = +result.flavorId;

        this.productService.createProduct(result).subscribe(() => {
          this.retrieveProducts();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Product deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while creating product:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to create product. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });

        });

        console.log('result', result);
      }
    });
  }


  openUpdateProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: {
        name: product.name,
        imageUrl: product.imageUrl,
        flavorId: product.flavorId,
        flavor: this.flavors
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.flavorId = +result.flavorId;

        console.log(product)        // Assuming you have an updateProduct method in your productService
        this.productService.updateProduct(product.id, result).subscribe(() => {
          this.retrieveProducts();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Product updated successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while updating product:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to update product. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });

        console.log('result', result);
      }
    });
  }

  deleteProduct(productId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this product? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.productService.deleteProduct(productId).subscribe(() => {
          this.retrieveProducts();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Product deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while deleting product:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to delete product. Please try again later' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        });
      }
    });
  }

}
