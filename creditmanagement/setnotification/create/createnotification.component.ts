import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { INotify } from '../_model/setnotification.model';

@Component({
  selector: 'app-createnotification',
  templateUrl: './createnotification.component.html',
  styleUrls: ['./createnotification.component.scss']
})
export class CreatenotificationComponent implements OnInit {
  notificationsForm: FormGroup;
  add = false;
  edit = false;
  isEditable:Boolean = false;
  alertslist = [{name:"Ramesh",email:"ramesh@test.com",mobile:"9912345678"},
  {name:"Mahesh",email:"mahesh@test.com",mobile:"9912345678",isEditable:false},
  {name:"Suresh",email:"suresh@test.com",mobile:"9912345678",isEditable:false}]
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreatenotificationComponent>, @Inject(MAT_DIALOG_DATA) public _editnotifydata: INotify) { }

  ngOnInit() {
    this.notificationsForm = this.fb.group({
      notificationId:[],
      //notificationName: ['', Validators.compose([Validators.required,Validators.minLength(2)])],
      notificationName: [''],
      name: ['', Validators.compose([Validators.required,Validators.minLength(5)])],
      email: ['', Validators.compose([Validators.required,Validators.minLength(10)])],
      phone:['', Validators.compose([Validators.required,Validators.minLength(10)])],
      days:[null,Validators.required],
      creditsbelow:[null, Validators.compose([Validators.required,Validators.minLength(2)])],
      smstext:['', Validators.compose([Validators.required,Validators.minLength(10)])],
      chemail:[false],
      chsms:[true],
      service:["service1"]
    });
    
    if(this._editnotifydata != null){
      this.notificationsForm.patchValue(this._editnotifydata);
      this.edit = true;
	  this.notificationsForm.get('name').clearValidators();
	 this.notificationsForm.get('name').clearAsyncValidators();
	 this.notificationsForm.get('name').updateValueAndValidity();
	 this.notificationsForm.get('email').clearValidators();
	 this.notificationsForm.get('email').clearAsyncValidators();
	 this.notificationsForm.get('email').updateValueAndValidity();
	 this.notificationsForm.get('phone').clearValidators();
	 this.notificationsForm.get('phone').clearAsyncValidators();
	 this.notificationsForm.get('phone').updateValueAndValidity();
    }

  }

  Add(){
    this.add = true;
    this.alertslist.push({name:this.notificationsForm.value.name,email:this.notificationsForm.value.email,mobile:this.notificationsForm.value.phone,isEditable:false})
  }

  createnotification(notificationsForm){

  }

}
