import { createPayment, getPayments } from '@shared/services/Payment';
import AppError from '@shared/errors/AppError';
import { IDonateWithPix } from '../domain/models/IDonateWithPix';
import { inject, injectable } from 'tsyringe';
import { IDonateWithPixRepository } from '../domain/repositories/IDonateWithPixRepository';


interface IRequest{
  amount: number;
  message: string;
  email: string;
  name: string; 
  phone: string; 
}

@injectable()
class SavePixTransactionService {
  private donateRepository: IDonateWithPixRepository;

  constructor(@inject('IDonateWithPixRepository')
    donateRepository: IDonateWithPixRepository){
    this.donateRepository = donateRepository;
  }
  public async execute({ amount, message, email, name, phone }: IRequest): Promise<string | undefined> {

    if(!email){
      email = "usertest322134@gmail.com";
    }

    const payment  = await createPayment(amount, 'payment', 'pix', email);

    const getPayment = await getPayments(payment as number);
    
    await this.donateRepository
    .saveDonateWithPix({ name : name, id_pix: payment, status: 
      getPayment.status, amount: getPayment.transaction_amount, 
      message,email, phone 
    } as IDonateWithPix);
    
    return getPayment.point_of_interaction?.transaction_data?.ticket_url;

  }
}
export default SavePixTransactionService;