import { Component, Inject } from '@angular/core';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flavor } from 'src/app/interfaces/flavor';

@Component({
  selector: 'app-update-flavor',
  templateUrl: './update-flavor.component.html',
  styleUrls: ['./update-flavor.component.css']
})
export class UpdateFlavorComponent {
  faX = faX;

  constructor(
    public dialogRef: MatDialogRef<UpdateFlavorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flavor
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
