import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faTrash, faPenToSquare, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { UpdateBookComponent } from '../update-book/update-book.component';
import { ConfirmDeletionDialogComponent } from 'src/app/shared/components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { SuccessSnackbarComponent } from 'src/app/shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from 'src/app/shared/components/error-snackbar/error-snackbar.component';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent {
  faTrash = faTrash;
  faPenToSquare = faPenToSquare;
  faMagnifyingGlass = faMagnifyingGlass;

  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>();
  displayedColumns: string[] = ['index', 'title', 'author', 'price', 'image', 'description', 'publishedDate', 'quantityInStock', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchTerm: string = '';

  constructor(private bookService: BookService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<Book>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        console.log(this.dataSource)
      },
      error: (e) => console.error(e),
    });
  }

  getIndex(row: Book): number {
    return this.dataSource.data.indexOf(row) + 1;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  openAddBookDialog(): void {
    const dialogRef = this.dialog.open(AddBookComponent, {
      data: { title: '', author: '', price: '', description: '', imageUrl: '', publishedDate: Date.now, quantityInStock: 0 }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.createBook(result).subscribe(() => {
          this.retrieveBooks();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Book created successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while creating book:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to create book. Please try again later' },
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


  openUpdateBookDialog(book: Book): void {
    const dialogRef = this.dialog.open(UpdateBookComponent, {
      data: {
        title: book.title,
        author: book.author,
        price: book.price,
        imageUrl: book.imageUrl,
        description: book.description,
        publishedDate: book.publishedDate,
        quantityInStock: book.quantityInStock
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bookService.updateBook(book.id, result).subscribe(() => {
          this.retrieveBooks();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Book updated successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while updating book:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to update book. Please try again later' },
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

  deleteBook(bookId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent, {
      data: { message: 'Do you really want to delete this book? This process cannot be undone' }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // User confirmed deletion
        this.bookService.deleteBook(bookId).subscribe(() => {
          this.retrieveBooks();

          this.snackBar.openFromComponent(SuccessSnackbarComponent, {
            data: { message: 'Book deleted successfully!' },
            panelClass: ['custom-snackbar'],
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
        }, (error) => {
          // Log the error here
          console.error('Error while deleting book:', error);

          this.snackBar.openFromComponent(ErrorSnackbarComponent, {
            data: { message: 'Failed to delete book. Please try again later' },
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