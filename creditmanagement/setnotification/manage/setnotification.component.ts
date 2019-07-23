import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SetNotificationService } from '../_service/setnotification.service';
import { INotify} from '../_model/setnotification.model';
import { CreatenotificationComponent } from '../create/createnotification.component';
import { NotificationdetailsComponent } from '../details/notificationdetails.component';
import { ConfirmNotificationComponent } from './setnotifyconfirm.component';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-setnotification',
  templateUrl: './setnotification.component.html',
  styleUrls: ['./setnotification.component.scss']
})
export class SetnotificationComponent implements OnInit {
  searchdata:any;
  listflag: boolean = false;
  selectedPage: any;
  public page = 0;
  public size = 9;
  public pageSize = environment.pageSize;
  notifications:INotify[];
  filternotification:INotify[]=[];
  filterListnotification:INotify[]=[];
  contactdata:INotify;
  dataSource = new MatTableDataSource();
  displayedColumns = ['notificationName', 'name', 'email', 'phone','creditsbelow','days','smstext', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private dialog: MatDialog, private setNotifyservice: SetNotificationService, private translate: TranslateService) { }

  ngOnInit() {

    this.notifications = this.setNotifyservice.getNotificationsList();
    this.dataSource=new MatTableDataSource(this.notifications);
    this.getData({ pageIndex: this.page, pageSize: this.size });
  }

  loadList() {
    this.listflag = true;
    this.getListData({ pageIndex: this.page, pageSize: this.size });
  }

  loadGrid() {
    this.listflag = false;
  }

  getStatusConfig(data?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.disableClose = true;
    data ? dialogConfig.data = data : undefined;
    dialogConfig.disableClose = true;
    return dialogConfig;
  }

  getDialogConfig(data?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '35vw';
    dialogConfig.height = '95.5%';
    dialogConfig.panelClass = 'rightdailog';
    dialogConfig.position = { right: '0px', bottom: '0' };
    data ? dialogConfig.data = data : undefined;
    dialogConfig.disableClose = true;
    return dialogConfig;
  }

  getData(_pageData) {
    let index = 0;
    let startingIndex = _pageData.pageIndex * _pageData.pageSize;
    let endingIndex = startingIndex + _pageData.pageSize;
    this.selectedPage = _pageData.pageIndex;
  
    this.filternotification = this.notifications.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
  }

  getListData(obj) {
    let index = 0,
      startingIndex = obj.pageIndex * obj.pageSize,
      endingIndex = startingIndex + obj.pageSize;
  
    this.filterListnotification = this.notifications.filter(() => {
      index++;
      return (index > startingIndex && index <= endingIndex) ? true : false;
    });
    this.dataSource = new MatTableDataSource(this.filterListnotification);
  }

  addNotification(){
    const dialogRef = this.dialog.open(CreatenotificationComponent, this.getDialogConfig());
    dialogRef.afterClosed().subscribe(result=>{
     if(result)
     this.notifications = this.setNotifyservice.getNotificationsList();
    });
  }

  editnotification(notifydetails){
    const dialogRef = this.dialog.open(CreatenotificationComponent, this.getDialogConfig(notifydetails));
  }

  notificationDetails(notifydetails){
    this.dialog.open(NotificationdetailsComponent, this.getDialogConfig(notifydetails));
  }

  deleteNotification(notifydetails){
    const dialogRef = this.dialog.open(ConfirmNotificationComponent, {
      width: '500px',
      data: "Do you want to delete Alert"+ ' \"' + notifydetails.notificationName+' \" ...?'
    });
  }

  notifyName(id){
    const cntdata =[];
    this.contactdata = this.notifications.find(x => x.notificationId == id);
    if(this.contactdata.contact.length > 0){
      this.contactdata.contact.forEach(contact => {
        cntdata.push(contact.name);
      });
      return cntdata;
    }
  }

  notifyEmail(id){
    const cntdata =[];
    this.contactdata = this.notifications.find(x => x.notificationId == id);
    if(this.contactdata.contact.length > 0){
      this.contactdata.contact.forEach(contact => {
        cntdata.push(contact.email);
      });
      return cntdata;
    }
  }
  
  notifyPhone(id){
 const cntdata =[];
 this.contactdata = this.notifications.find(x => x.notificationId == id);
 if(this.contactdata.contact.length > 0){
 this.contactdata.contact.forEach(contact => {
 cntdata.push(contact.phone);
 });
 return cntdata;
 }
 }

}
