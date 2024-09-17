import AppError from '@shared/errors/AppError';
import { IPerson } from '../domain/models/IPerson';
import { IPersonRepository } from '../domain/repositories/IPersonRepository';
import { inject, injectable } from 'tsyringe';


interface IRequest{
  param: string
}
@injectable()
class FindPersonService{
  private personRepository: IPersonRepository;
  constructor(@inject('IPersonRepository')
    personRepository: IPersonRepository){
    this.personRepository = personRepository;
  }
  public async execute({param}:IRequest): Promise<IPerson>{
    
    const person = await this.personRepository.findByEmailOrPhone(param);
    if(!person){
      throw new AppError('No Person found', 404);
    }
    return person;
  }
}
export default FindPersonService;