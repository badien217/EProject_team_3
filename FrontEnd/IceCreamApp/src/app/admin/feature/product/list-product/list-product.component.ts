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
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MessageService } from 'src/app/services/message.service';

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

  constructor(private productService: ProductService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) { }

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
      error: (e) => this.messageService.openError('Product data retrieval error')
    });
  }

  getIndex(row: Product): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddProductDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.retrieveProducts();
    });
  }


  openUpdateProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: {
        id: product.id,
        name: product.name,
        imageUrl: product.imageUrl,
        flavorId: product.flavorId,
        flavor: this.flavors
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.flavorId = +result.flavorId;

        this.retrieveProducts();
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

          this.messageService.openSuccess('Product deleted successfully');
        }, (error) => {
          this.messageService.openError('Failed to delete product. Please try again later');
        });
      }
    });
  }

}
