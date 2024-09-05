import AppError from '@shared/errors/AppError';
import {IDonor as IDonorModel} from '../entities/Donor';
import DonorRepository from '../repository/DonorRepository';

interface IRequest{
  email: string
}

class FindDonorService{
  public async execute({email}:IRequest): Promise<IDonorModel>{
    const donorRepository = new DonorRepository();
    
    const donor = await donorRepository.findByEmail(email);

    if(!donor){
      throw new AppError('No donor found', 404);
    }
    
    return donor;
  }
}
export default FindDonorService;