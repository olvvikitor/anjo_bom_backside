import { Twilio } from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const myNumber = process.env.MY_NUMBER;

const client = new Twilio(accountSid, authToken);

export function sendSms(code: string){

client.messages
.create({
  from: twilioNumber,
  to: myNumber as string,
  body: `Seu código de verificação: ${code}!`,
  
})
.then((message) => console.log(message.sid))
};