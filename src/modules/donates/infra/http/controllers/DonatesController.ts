import{Request, Response} from 'express'
import SavePixTransactionService from '@modules/donates/services/SaveDonatesWithPix';
import UpdateStatusWhitPix from '@modules/donates/services/UpdatePixDonateService';
import { container } from 'tsyringe';
import FindAllDonatesApproved from '@modules/donates/services/FindAllDonatesApproved';
import { IPaginate } from '@shared/domain/paginate/IPaginate';

class DonatesController{

public async donateWithPix(request:Request, response: Response):Promise<Response>{

  const {amount, message, email, name, phone} = request.body;
  
  const saveDonateWithPix = container.resolve(SavePixTransactionService)

  const payment = await saveDonateWithPix.execute({amount, message, email, name, phone})

  return  response.status(200).json({ticket_url:payment})
}
public async updateInfoPix(request:Request, response: Response):Promise<Response>{

  const updateStatusWhitPix = container.resolve(UpdateStatusWhitPix)

  await updateStatusWhitPix.execute();

  return response.status(200).json()
}
public async findAllDonatesApproved(request: Request, response: Response): Promise<Response> {

  const { page, perPage} = request.query;
 
   const options:IPaginate = {
     page: parseInt(page as string, 10),
     limit: parseInt(perPage as string, 10) 
   }
 

 const updateStatusWhitPix = container.resolve(UpdateStatusWhitPix)

 await updateStatusWhitPix.execute();

 const findAllDonatesApproved = container.resolve(FindAllDonatesApproved);
 const donations = await findAllDonatesApproved.execute(options);
 return response.status(200).json(donations);
 
}
}
export default DonatesController;