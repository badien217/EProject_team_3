import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent {
  faX = faX;
  userAvatarForm: FormGroup;
  userData: User;
  selectedImage: string = '';
  uploading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateAvatarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.userData = data;

    this.userAvatarForm = this.fb.group({
      id: [data.id],
      avatar: [data.avatar]
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

      this.userAvatarForm.patchValue({
        avatar: file,
      });
    }
  }

  onSubmit(): void {
    if (this.userAvatarForm.valid) {
      const formData = this.userAvatarForm.value;
      this.uploading = true;
      this.messageService.openInfo('Please wait for photo to upload')

      this.userService.uploadAvatar(this.userData.id, formData).subscribe(
        (data) => {
          this.dialogRef.close(formData);
          this.messageService.openSuccess('Avatar uploaded successfully');
        },
        (error) => {
          this.messageService.openError('Fail to upload avatar. Please try again');
        }
      )
    }
  }
}
