import AppError from '@shared/errors/AppError';

import PersonRepository from '@modules/donor/repository/PersonRepository';
import { IPerson } from '@modules/donor/entities/Person';


class GetAllDonorService{
  public async showAll(): Promise<IPerson[] | null>{
    const personRepository = new PersonRepository();
    
    const admins = await personRepository.findAll();

    return admins;
  }
}
export default GetAllDonorService;