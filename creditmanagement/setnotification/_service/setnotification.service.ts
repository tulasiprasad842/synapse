import { Injectable } from '@angular/core';
import {INotify} from '../_model/setnotification.model';

 @Injectable({ providedIn: 'root' })

export class SetNotificationService {
  public component = "SetnotificationQuota";

    setnotifyList:INotify[]=[
        {notificationId:1,notificationName:'Expiry Alert-1', contact:[{contactId:1,name:'Ramesh', email:'Ramesh@example.com', phone:'9876543210'},{contactId:8,name:'Ranvee', email:'Ranvee@example.com', phone:'9876543217'},{contactId:9,name:'Hari', email:'Hari@example.com', phone:'9876543218'}],days:10,creditsbelow:100,smstext:'Your credits are below 100 add credits to your account if needed'},
        {notificationId:2,notificationName:'Expiry Alert-2',contact:[{contactId:2,name:'Ramakrishna', email:'Ramakrishna@example.com',phone:'9876543211'}], days:20,creditsbelow:100,smstext:'Your credits are below 100 add credits to your account if needed'},
        {notificationId:3,notificationName:'Expiry Alert-3',contact:[{contactId:3,name:'Raju', email:'Raju@example.com', phone:'9876543212'}],days:5,creditsbelow:100,smstext:'Your credits are below 100 add credits to your account if needed'},
        {notificationId:4,notificationName:'Expiry Alert-4', contact:[{contactId:4,name:'Ramu',email:'Ramu@example.com',phone:'9876543213'}], days:7,creditsbelow:120,smstext:'Your credits are below 120 add credits to your account if needed'},
        {notificationId:5,notificationName:'Expiry Alert-5',contact:[{contactId:5,name:'Vivek', email:'Vivek@example.com', phone:'9876543214'}],days:3,creditsbelow:150,smstext:'Your credits are below 150 add credits to your account if needed'},
        {notificationId:6,notificationName:'Expiry Alert-6',contact:[{contactId:6,name:'Nayak', email:'Nayak@example.com',phone:'9876543215'}], days:3,creditsbelow:200,smstext:'Your credits are below 200 add credits to your account if needed'},
        {notificationId:7,notificationName:'Expiry Alert-7', contact:[{contactId:7,name:'Aravind',email:'Aravind@example.com', phone:'9876543216'}],days:6,creditsbelow:100,smstext:'Your credits are below 100 add credits to your account if needed'},
    ]

    getNotificationsList(){
      return this.setnotifyList;
    }

    // createDeaprtment(deptform:IDepartment){
    //    var deptList: IDepartment[] = this.departmentList;
    //    return deptList.push(deptform);
    // }

    // editDepartment(deptform:IDepartment){
    //      let updateItem = this.departmentList.find(this.findIndexToUpdate, deptform.deptId);
    //      let index = this.departmentList.indexOf(updateItem);
    //      return this.departmentList[index] = deptform;
    // }

    // deleteDepartment(deptform:IDepartment){
    //     let deleteItem = this.departmentList.find(this.findIndexToUpdate, deptform.deptId);
    //     let index = this.departmentList.indexOf(deleteItem);
    //     return this.departmentList.splice(index,1);
    // }

    // updateDepartmentStatus(deptform:IDepartment){
    //     let updateStatus = this.departmentList.find(this.findIndexToUpdate, deptform.deptId);
    //      let index = this.departmentList.indexOf(updateStatus);
    //      return this.departmentList[index] = deptform;
    // }

    // findIndexToUpdate(deptform) { 
    //         return deptform.deptId === this;
    //   }
}