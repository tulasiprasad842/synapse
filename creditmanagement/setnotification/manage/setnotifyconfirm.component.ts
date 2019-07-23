import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notifyalert',
  template: `<h1 mat-dialog-title> Confirmation</h1>
  <div mat-dialog-content>
    <p>
        <b>{{data}}</b>
    </p>
  </div>
  <div mat-dialog-actions>
    <button mat-button color="primary" [mat-dialog-close]="true">Yes</button>
    <button mat-button color="primary"  [mat-dialog-close]="false" cdkFocusInitial>No</button>
  </div>`,
})
export class ConfirmNotificationComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.data = data;
    console.log("data:::" + JSON.stringify(data));
  }

}