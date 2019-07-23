import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlatformquotaService } from '../_service/platformquota.service';
import { ICreditType, IPlatformCredit, IResponse } from '../_model/platformquota.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlertMessageService, ActionType } from '../../../_services/AlertMessageService';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-platformquotasetlimit',
  templateUrl: './platformquotasetlimit.component.html',
  styleUrls: ['./platformquotasetlimit.component.scss']
})
export class PlatformquotasetlimitComponent implements OnInit {
  platformCreditsForm: FormGroup;
  CreditTypes: ICreditType[]=[];
  loading: boolean = false;
   constructor(private fb: FormBuilder, private platformquota: PlatformquotaService, 
    public dialogRef:MatDialogRef<PlatformquotasetlimitComponent>, @Inject(MAT_DIALOG_DATA) public editData:IPlatformCredit,
     private alertmessage:AlertMessageService,private datePipe:DatePipe, 
     private translate:TranslateService, private router:Router){
      console.log("editData=>", editData);
      
     }
  expiryDate: string;
  hasExpiryDate: number;
  platformCreditId: number;

  ngOnInit() {
    this.platformCreditsForm = this.fb.group({
      availableBalance: [null],
      modifiedCredits: [null, [Validators.required, Validators.minLength(3)]],
      accountType: [null, Validators.required],
      adjustmentType: [null, Validators.required],
      expiryDate: [null],
      hasExpiry: [false]
    });
    this.getCreditTypes();
    if(this.editData){
      // this.platformCreditsForm.get('modifiedCredits').setValue(this.editData.credits);
      this.platformCreditsForm.get('availableBalance').setValue(this.editData.availableBalance);
      this.platformCreditsForm.get('hasExpiry').setValue(this.editData.hasExpiryDate);
      if(this.editData.expiryDate){
        const str = this.editData.expiryDate.split('-');
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);
        let date1 = new Date(year, month, date);
        console.log(date1,this.editData.expiryDate);
      }
    
      // this.platformCreditsForm.get('expiryDate').setValue(date1);
      
      
      // this.platformCreditsForm.get('adjustmentType').setValue(this.editData.)
    }
   
  
  }

  getCreditTypes() {
    this.platformquota.getAllCreditTypes().subscribe((result: ICreditType[]) => {
      console.log("Credits==>", result);
      if(result){
        this.CreditTypes = result;
        if(this.editData)
        this.platformCreditsForm.get('accountType').setValue(this.editData.creditType);
      }
     
    });
  }

  hasExpiry() {
    console.log("has expiry==>",this.platformCreditsForm.value.hasExpiry);
    this.platformCreditsForm.get('expiryDate').setValue(null);
    if (this.platformCreditsForm.value.hasExpiry == false) {
      this.platformCreditsForm.get('expiryDate').clearValidators();
      this.platformCreditsForm.get('expiryDate').updateValueAndValidity();
    } else {
      this.platformCreditsForm.get('expiryDate').setValidators(Validators.required);
    }
   }

   addCredits(){
    this.loading = true;
    let expirydate=this.datePipe.transform(this.platformCreditsForm.value.expiryDate, "yyyy-MM-dd hh:mm:ss");
     let IPlatformCreate:IPlatformCredit={
       availableBalance:  this.platformCreditsForm.value.availableBalance,
       creditType: this.platformCreditsForm.value.accountType,
       credits:  this.editData.credits,
       expiryDate:  this.platformCreditsForm.value.hasExpiry == true? expirydate:null,
       hasExpiryDate: this.platformCreditsForm.value.hasExpiry == true? 1:0,
       modifiedCredits:this.platformCreditsForm.value.modifiedCredits,
       platformCreditId:this.editData.platformCreditId,
       transactionType: this.platformCreditsForm.value.adjustmentType
}
   console.log("IPlatformCreate=>", IPlatformCreate);
   this.platformquota.updatePlatformCredits(IPlatformCreate).subscribe((response:IResponse)=>{
     console.log('response=>', IPlatformCreate);
     if (response.status) {
      this.alertmessage.showAlert(response.message, ActionType.SUCCESS);
      this.dialogRef.close(IPlatformCreate);
    } else {
      this.alertmessage.showAlert(response.message, ActionType.FAILED);
    }
       this.loading = false;
    }, error => {
      let message = error.error.message as string;
      let errorMessage = error.status == 404 ? this.translate.instant('ActionNames.errorResponse') : message ? message : error.message;
      console.error("E-addCredits==>", JSON.stringify(error));
      this.showAlert(errorMessage, ActionType.ERROR, error.status);
      this.loading = false;
       });
      }
      showAlert(error: any, action: ActionType, status: number = 0) {
        if (status == 401)
          this.router.navigate(['401']);
        else setTimeout(() => this.alertmessage.showAlert(error, action));
      }

   }

