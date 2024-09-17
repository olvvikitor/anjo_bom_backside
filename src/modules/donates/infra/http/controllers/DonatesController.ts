import{Request, Response} from 'express'
import SavePixTransactionService from '@modules/donates/services/SaveDonatesWithPix';
import UpdateStatusWhitPix from '@modules/donates/services/UpdatePixDonateService';
import { container } from 'tsyringe';

class DonatesController{

public async donateWithPix(request:Request, response: Response):Promise<Response>{

  const {amount, message, email, name, phone} = request.body;
  
  const saveDonateWithPix = container.resolve(SavePixTransactionService)

  const payment = await saveDonateWithPix.execute({amount, message, email, name, phone})

  return  response.status(200).json({ticket_url:payment})
}
public async updateInfoPix(request:Request, response: Response):Promise<Response>{
  const id = request.params.id;


  const updateStatusWhitPix = container.resolve(UpdateStatusWhitPix)

  await updateStatusWhitPix.execute(id);

  return response.status(200).json()
}
}
export default DonatesController;