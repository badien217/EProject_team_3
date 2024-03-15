import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Flavor } from 'src/app/interfaces/flavor';

@Component({
  selector: 'app-add-flavor',
  templateUrl: './add-flavor.component.html',
  styleUrls: ['./add-flavor.component.css']
})
export class AddFlavorComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<AddFlavorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flavor
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
