export interface IPlatformCredit {
  availableBalance: number;
  creditType: number;
  credits: number;
  expiryDate: string;
  hasExpiryDate: number;
  modifiedCredits?:number;
  platformCreditId: number;
  transactionType?: number;
}
export interface ICreditType {
  creditCode: string;
  creditName: string;
  creditTypeId: number;
}

export interface IResponse {
  id: number;
  message: string;
  status: boolean;
}