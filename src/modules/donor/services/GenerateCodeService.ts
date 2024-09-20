import { ISmsService } from '@shared/domain/models/ISmsService';
import { inject, injectable } from 'tsyringe';

@injectable()
export  class GenerateCodeService {
    constructor(
        @inject('ISmsService')  
        private smsService :ISmsService){
        this.smsService = smsService;
    }
    generateFourDigitCode() {
    const codeGenerated = Math.floor(1000 + Math.random() * 9000);
    const code = codeGenerated.toString().padStart(4, '0');
    this.smsService.sendSms(code);
    return code;
}
}
