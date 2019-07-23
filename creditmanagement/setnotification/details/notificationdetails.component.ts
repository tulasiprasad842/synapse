import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notificationdetails',
  templateUrl: './notificationdetails.component.html',
  styleUrls: ['./notificationdetails.component.scss']
})
export class NotificationdetailsComponent implements OnInit {
  notificationDetails:any;
  constructor(private dialogRef: MatDialogRef<NotificationdetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
    if(this.data != null){
      this.notificationDetails = this.data;
    }
  }

}
