import { createPayment, getPayments } from '@shared/services/Payment';
import DonateRepository from '../repositories/DonateRepository';
import { IDonateWithPix } from '../entities/DonateWithPix';
import AppError from '@shared/errors/AppError';

interface IRequest{
  amount: number;
  message: string;
  email: string;
  name: string; 
  phone: string;  
}

class SavePixTransactionService {
  public async execute({ amount, message, email, name, phone }: IRequest): Promise<string | undefined> {

    const donateRepository = new DonateRepository();
    if(!email){
      email = "usertest322134@gmail.com";
    }
    

    const payment  = await createPayment(amount, 'payment', 'pix', email);

    const getPayment = await getPayments(payment as number);
    
    await donateRepository.saveDonateWithPix({ name : name, id_pix: payment, status: getPayment.status, amount: getPayment.transaction_amount, message,email, phone } as IDonateWithPix);
    
    return getPayment.point_of_interaction?.transaction_data?.ticket_url;

  }
}
export default SavePixTransactionService;