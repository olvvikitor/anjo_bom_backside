import { inject, injectable } from 'tsyringe';
import { IDonateWithPix } from '../domain/models/IDonateWithPix';
import { IDonateWithPixRepository } from '../domain/repositories/IDonateWithPixRepository';
import { IPayment } from '@shared/domain/models/IPaymentService';


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
  private paymentService: IPayment;;

  constructor(
    @inject('IDonateWithPixRepository')
    donateRepository: IDonateWithPixRepository,
    @inject('IPayment')
    paymentService: IPayment
  ){
    this.donateRepository = donateRepository;
    this.paymentService = paymentService;
  }


  public async execute({ amount, message, email, name, phone }: IRequest): Promise<string | undefined> {

    if(!email){
      email = "usertest322134@gmail.com";
    }

    const payment  = await this.paymentService.createPayment(amount, 'payment', 'pix', email);

    const getPayment = await this.paymentService.getPayments(payment as number);
    
    await this.donateRepository
    .saveDonateWithPix({ name : name, id_pix: payment, status: 
      getPayment.status, amount: getPayment.transaction_amount, 
      message,email, phone 
    } as IDonateWithPix);
    
    return getPayment.point_of_interaction?.transaction_data?.ticket_url;

  }
}
export default SavePixTransactionService;