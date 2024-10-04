import { ISmsService } from '@shared/domain/models/ISmsService';
import { inject, injectable } from 'tsyringe';

@injectable()
class SendCodeSmsService{
  constructor(
    @inject('ISmsService')  
    private smsService :ISmsService){
    this.smsService = smsService;
  }
  async execute(code:string, phoneNumber: string):Promise<void>{
   await this.smsService.sendSms(code, phoneNumber);
  }
}
export default SendCodeSmsService