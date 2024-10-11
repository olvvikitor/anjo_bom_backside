import { inject, injectable } from 'tsyringe';
import { IPersonRepository } from '../domain/repositories/IPersonRepository';
import { IPerson } from '../domain/models/IPerson';
import { IPaginate } from '@shared/domain/paginate/IPaginate';
@injectable()
class GetAllDonorsService{
  private personRepository: IPersonRepository;

  constructor (
    @inject('IPersonRepository')
    personRepository:IPersonRepository
  ){
    this.personRepository = personRepository;
  }

  public async  execute(options : IPaginate) : Promise<IPerson[]>{
    return this.personRepository.findAll(options);
  }
}
export default GetAllDonorsService;
