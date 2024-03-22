import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Observable, map } from 'rxjs';
import { SuccessSnackbarComponent } from '../shared/components/success-snackbar/success-snackbar.component';
import { ErrorSnackbarComponent } from '../shared/components/error-snackbar/error-snackbar.component';
import { WarningSnackbarComponent } from '../shared/components/warning-snackbar/warning-snackbar.component';
import { InfoSnackbarComponent } from '../shared/components/info-snackbar/info-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private snackBar: MatSnackBar) { }

  openSuccess(message: string, duration: number = 3000, panelClass: string[] = ['custom-snackbar']): void {
    this.openSnackbar(SuccessSnackbarComponent, message, duration, panelClass);
  }

  openError(message: string, duration: number = 3000, panelClass: string[] = ['custom-snackbar']): void {
    this.openSnackbar(ErrorSnackbarComponent, message, duration, panelClass);
  }

  openWarning(message: string, duration: number = 3000, panelClass: string[] = ['custom-snackbar']): void {
    this.openSnackbar(WarningSnackbarComponent, message, duration, panelClass);
  }

  openInfo(message: string, duration: number = 3000, panelClass: string[] = ['custom-snackbar']): void {
    this.openSnackbar(InfoSnackbarComponent, message, duration, panelClass);
  }


  private openSnackbar(component: any, message: string, duration: number, panelClass: string[]): void {
    const config = new MatSnackBarConfig();
    config.data = { message };
    config.duration = duration;
    config.panelClass = panelClass;
    config.horizontalPosition = 'end';
    config.verticalPosition = 'top';
    this.snackBar.openFromComponent(component, config);
  }
}
