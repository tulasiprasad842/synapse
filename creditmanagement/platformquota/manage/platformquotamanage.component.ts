import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { PlatformquotasetlimitComponent } from '../setlimit/platformquotasetlimit.component';
import { PlatformquotaService } from '../_service/platformquota.service';
import { IPlatformCredit, IResponse } from '../_model/platformquota.model';

@Component({
  selector: 'app-platformquotamanage',
  templateUrl: './platformquotamanage.component.html',
  styleUrls: ['./platformquotamanage.component.scss']
})
export class PlatformquotamanageComponent implements OnInit {
  platformQuotaList:IPlatformCredit[]=[];
  filterPlatformQuota:IPlatformCredit[];
  constructor(private dialog: MatDialog, private platformquota:PlatformquotaService) { }

  ngOnInit() {
    this.getplatformCredits();
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

  getplatformCredits(){
   this.platformquota.getPlatformCreditsDetails().subscribe((response:IPlatformCredit[])=>{
     console.log('response=>', response);
     if(response){
       this.platformQuotaList=response;
     }
     
   })
  }

  setLimit(creditObj:IPlatformCredit) {
    let dialogRef = this.dialog.open(PlatformquotasetlimitComponent, this.getDialogConfig(creditObj));
    dialogRef.afterClosed().subscribe((result:IResponse)=>{
      if(result){
        this.getplatformCredits();
      }
    })
  }
}
