import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent {
  faX = faX;
  bookForm: FormGroup;
  book: Book;
  selectedImage: string = '';
  updating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private fb: FormBuilder,
    private bookService: BookService,
    private messageService: MessageService
  ) {
    this.book = data;

    this.bookForm = this.fb.group({
      title: [data.title, Validators.required],
      author: [data.author, Validators.required],
      price: [data.price, Validators.required],
      imageUrl: [data.imageUrl, Validators.required],
      description: [data.description, Validators.required],
      publishedDate: [data.publishedDate, Validators.required],
      quantityInStock: [data.quantityInStock, Validators.required]
    })
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

      this.bookForm.patchValue({
        imageUrl: file,
      });
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const updateBook = this.bookForm.value;
      this.updating = true;
      this.messageService.openInfo('Please wait for photo to upload');

      this.bookService.updateBook(this.book.id, updateBook).subscribe(() => {
        this.dialogRef.close(updateBook);
        this.messageService.openSuccess('Book updated successfully');

      }, (error) => {
        this.messageService.openError('Failed to update book. Please try again');
      });
    }
  }
}
