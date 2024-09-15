import AppError from '@shared/errors/AppError';
import { IDonateWithPix } from '../entities/DonateWithPix';
import DonateRepository from '../repositories/DonateRepository';


class FindAllDonatesApproved{
  public async execute(): Promise<IDonateWithPix[]|null> {
    const donateRepository = new DonateRepository();
    const donates = await donateRepository.findAllApproved();
    if(!donates){
      throw new AppError('Not found donates', 404)
    }
    return donates
  }
}
export default FindAllDonatesApproved;