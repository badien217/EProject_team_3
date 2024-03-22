import { Component, Inject } from '@angular/core';
import { faL, faX } from '@fortawesome/free-solid-svg-icons';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Flavor } from 'src/app/interfaces/flavor';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlavorService } from 'src/app/services/flavor.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-update-flavor',
  templateUrl: './update-flavor.component.html',
  styleUrls: ['./update-flavor.component.css']
})
export class UpdateFlavorComponent {
  faX = faX;
  flavorForm: FormGroup;
  flavor: Flavor;
  selectedImage: string = '';
  updating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateFlavorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Flavor,
    private fb: FormBuilder,
    private flavorService: FlavorService,
    private messageService: MessageService
  ) {
    this.flavor = data;

    this.flavorForm = this.fb.group({
      name: [data.name, Validators.required],
      imageUrl: [data.imageUrl]
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

      this.flavorForm.patchValue({
        imageUrl: file,
      });
    }
  }

  onSubmit(): void {
    if (this.flavorForm.valid) {
      const updateFlavor = { ...this.flavorForm.value };
      this.updating = true;
      this.messageService.openInfo('Please wait for photo to upload');

      this.flavorService.updateFlavor(this.flavor.id, updateFlavor).subscribe(() => {
        this.dialogRef.close(updateFlavor);
        this.updating = false;
        this.messageService.openSuccess('Flavor updated successfully');
      }, (error) => {
        this.messageService.openError('Failed to update flavor. Please try again');
      });
    }
  }
}
