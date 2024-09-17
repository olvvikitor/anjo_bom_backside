import { ISmsService } from '@shared/domain/models/ISmsService';
import { Twilio } from "twilio";

const myNumber = process.env.MY_NUMBER;

export class TwilloSmsService implements ISmsService {
  private client: Twilio;
  private twilioNumber = process.env.TWILIO_PHONE_NUMBER;
  constructor(){
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    this.client = new Twilio(accountSid, authToken);
  }
  public async sendSms(code: string): Promise<void>{

  const message = await this.client.messages
      .create({
        from: this.twilioNumber,
        to: myNumber as string,
        body: `Seu código de verificação: ${code}!`,
      });
    return console.log(message.sid);
  };

}