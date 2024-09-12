import AppError from '@shared/errors/AppError';
import {IPerson as IPersonModel} from '../entities/Person';
import PersonRepository from '../repository/PersonRepository';

interface IRequest{
  param: string
}

class FindPersonService{
  public async execute({param}:IRequest): Promise<IPersonModel>{
    const personRepository = new PersonRepository();
    
    const person = await personRepository.findByEmailOrPhone(param);
    if(!person){
      throw new AppError('No Person found', 404);
    }
    return person;
  }
}
export default FindPersonService;