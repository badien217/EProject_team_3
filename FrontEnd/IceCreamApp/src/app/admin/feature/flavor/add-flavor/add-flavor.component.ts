import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FlavorService } from 'src/app/services/flavor.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-add-flavor',
  templateUrl: './add-flavor.component.html',
  styleUrls: ['./add-flavor.component.css']
})
export class AddFlavorComponent {
  faX = faX;
  flavorForm: FormGroup;
  selectedImage: string = '';
  creating: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddFlavorComponent>,
    private fb: FormBuilder,
    private flavorService: FlavorService,
    private messageService: MessageService,
  ) {
    this.flavorForm = this.fb.group({
      name: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
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
      this.flavorForm.patchValue({
        imageUrl: file,
      });
    }
  }

  onSubmit(): void {
    if (this.flavorForm.valid) {
      const newFlavor = this.flavorForm.value;
      this.creating = true;
      this.messageService.openInfo('Please wait for photo to upload');

      this.flavorService.createFlavor(newFlavor).subscribe(() => {
        this.dialogRef.close(newFlavor);
        this.creating = false;
        this.messageService.openSuccess('Flavor created successfully!');

      }, (error) => {
        this.messageService.openError('Failed to create flavor. Please try again');
      });
    }
  }
}