import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/interfaces/user';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  faX = faX;
  userInfoForm: FormGroup;
  userData: User;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private fb: FormBuilder,
    private messageService: MessageService,
    private userService: UserService
  ) {
    this.userData = data;

    this.userInfoForm = this.fb.group({
      name: [data.name, Validators.required],
      phone: [data.phone, Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userInfoForm.valid) {
      const updateData = this.userInfoForm.value;

      this.userService.updateUser(this.userData.id, updateData).subscribe(
        (data) => {
          this.dialogRef.close(updateData);
          this.messageService.openSuccess('User info updated successfully');
        },
        (error) => {
          this.messageService.openError('Fail to update user. Please try again');
        }
      )
    }
  }

}
