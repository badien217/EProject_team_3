import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Book } from 'src/app/interfaces/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<AddBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Book
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
