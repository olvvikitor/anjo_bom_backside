
export interface ISmsService{
  sendSms(code: string, phone:string): Promise<void>
}