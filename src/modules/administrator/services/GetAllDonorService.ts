import { IPerson } from '@modules/donor/domain/models/IPerson';
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class GetAllDonorService{
  private personRepository: IPersonRepository;
  constructor(
    @inject('IPersonRepository') 
    personRepository: IPersonRepository){
    this.personRepository = personRepository;
  }
  public async showAll(): Promise<IPerson[] | null>{
    
    const admins = await this.personRepository.findAll();

    return admins;
  }
}
export default GetAllDonorService;