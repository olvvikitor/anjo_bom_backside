import{Request, Response} from 'express'
import { createPayment, getPayments } from '@shared/services/Payment';
import SavePixTransactionService from '../services/SaveDonatesWithPix';
import UpdateStatusWhitPix from '../services/UpdatePixDonateService';

class DonatesController{

public async donateWithPix(request:Request, response: Response):Promise<Response>{

  const {amount, message, email, name, phone} = request.body;
  
  const saveDonateWithPix = new SavePixTransactionService();

  const payment = await saveDonateWithPix.execute({amount, message, email, name, phone})

  return  response.status(200).json(payment)
}
public async updateInfoPix(request:Request, response: Response):Promise<Response>{
  const id = request.params.id;

  const idParse = parseInt(id)

  const updateStatusWhitPix = new UpdateStatusWhitPix();

  await updateStatusWhitPix.execute({ id: idParse});

  return response.status(200).json()
}
}
export default DonatesController;