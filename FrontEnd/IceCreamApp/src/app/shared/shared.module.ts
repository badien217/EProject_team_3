import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmDeletionDialogComponent } from './components/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { SuccessSnackbarComponent } from './components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from './components/error-snackbar/error-snackbar.component';
import { WarningSnackbarComponent } from './components/warning-snackbar/warning-snackbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmWarningDialogComponent } from './components/confirm-warning-dialog/confirm-warning-dialog.component';
import { InfoSnackbarComponent } from './components/info-snackbar/info-snackbar.component';

@NgModule({
  declarations: [
    ConfirmDeletionDialogComponent,
    SuccessSnackbarComponent,
    ErrorSnackbarComponent,
    WarningSnackbarComponent,
    NotFoundComponent,
    ConfirmWarningDialogComponent,
    InfoSnackbarComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FontAwesomeModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
  ]
})
export class SharedModule { }
