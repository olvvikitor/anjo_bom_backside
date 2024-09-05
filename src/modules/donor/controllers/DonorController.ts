import{Request, Response} from 'express'
import CreateDonorService from '../services/CreateDonorService';
import AppError from '@shared/errors/AppError';
import FindDonorService from '../services/FindDonorService';
class DonorConroller{
  public async createDonor(request:Request, response: Response):Promise<Response>{
    const createDonorService = new CreateDonorService;
    
    const {name, last_name, email, password, motivation, address} = request.body;
  
    const [{ cep, estado, cidade, bairro, rua, numero }] = address;

    const donorData = {
      cep,
      name,
      last_name,
      email,
      password,
      motivation,
      address: [{ cep, estado, cidade, bairro, rua, numero }]
    }

    const donor = await createDonorService.execute(donorData);
    
    return response.status(200).json(donor);
  }
  public async findByEmail(request:Request, response:Response): Promise<Response> {
    const findDonerByEmailService = new FindDonorService
    const {email} = request.body;
    const donor = await findDonerByEmailService.execute({email});
    return response.status(200).json(donor);
  }
}export default DonorConroller;