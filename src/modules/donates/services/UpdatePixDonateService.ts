import { createPayment, getPayments } from '@shared/services/Payment';
import DonateRepository from '../repositories/DonateRepository';
import { IDonateWithPix } from '../entities/DonateWithPix';
import AppError from '@shared/errors/AppError';

interface IRequest{
  id: number;
}

class UpdateStatusWhitPix {
  public async execute({id}: IRequest): Promise<void> {

    const donateRepository = new DonateRepository();
    
    let donate = await donateRepository.findByIdPix(id);
    console.log(donate);
    if(donate){
      const getPayment = await getPayments(id as number);
         if (!getPayment){
            throw new AppError("Transação não encontrada");
          }
       donate.status = getPayment.status as string;
       donate.name = getPayment.payer?.first_name as string;
       console.log(donate);

       await donateRepository.updateDonateWithPix(donate);
    }
  }
}
export default UpdateStatusWhitPix;