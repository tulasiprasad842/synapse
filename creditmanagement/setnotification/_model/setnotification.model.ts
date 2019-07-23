export interface INotify{
    notificationId?: number;
    notificationName:string;
    contact:IContact[];
    days:number;
    smstext:string;
    creditsbelow:number;
   }

export interface IContact{
    contactId:number;
    name:string;
    email:string;
    phone:string;
}
  