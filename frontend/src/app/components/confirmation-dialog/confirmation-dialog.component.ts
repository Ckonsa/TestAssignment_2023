import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  // Got the code and idea from here: https://www.javachinna.com/angular-confirmation-dialog/
  message = 'Are you sure want to delete this?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {
    if (data){
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
