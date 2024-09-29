import AppError from '@shared/errors/AppError';
import { IDonateWithPix } from '../domain/models/IDonateWithPix';
import { inject, injectable } from 'tsyringe';
import { IDonateWithPixRepository } from '../domain/repositories/IDonateWithPixRepository';
import { IPaginate } from '@shared/domain/paginate/IPaginate';

@injectable()
class FindAllDonatesApproved{
  private donateRepository: IDonateWithPixRepository;

  constructor(@inject('IDonateWithPixRepository')
    donateRepository: IDonateWithPixRepository){
    this.donateRepository = donateRepository;
  }

  public async execute(options:IPaginate): Promise<IDonateWithPix[]|null> {
    
    const donates = await this.donateRepository.findAllApproved(options);
    if(!donates){
      throw new AppError('Not found donates', 404)
    }
    return donates
  }
}
export default FindAllDonatesApproved;