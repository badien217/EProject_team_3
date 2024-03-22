import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/interfaces/book';
import { BookService } from 'src/app/services/book.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  faX = faX;
  bookForm: FormGroup;
  selectedImage: string = '';
  creating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book,
    private fb: FormBuilder,
    private bookService: BookService,
    private messageService: MessageService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required],
      description: ['', Validators.required],
      publishedDate: [new Date(), Validators.required],
      quantityInStock: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: any): void {
    const file = (event.target as HTMLInputElement).files?.[0];

    // Check if a file is selected
    if (file) {
      // Read the selected file and display it
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
      };
      reader.readAsDataURL(file);

      // Update the form control with the selected file
      this.bookForm.patchValue({
        imageUrl: file,
      });
    }
  }

  onSubmit() {
    if (this.bookForm.valid) {
      const newBookData = this.bookForm.value;
      this.creating = true;
      this.messageService.openInfo('Please wait for photo to upload');

      this.bookService.createBook(newBookData).subscribe(() => {
        this.dialogRef.close(newBookData);
        this.messageService.openSuccess('Book created successfully!');

      }, (error) => {
        this.messageService.openError('Failed to create book. Please try again');
      });
    }
  }
}