
export interface ISmsService{
  sendSms(code: string): Promise<void>
}