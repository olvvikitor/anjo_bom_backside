import { inject, injectable } from 'tsyringe';
import { IPersonRepository } from '../domain/repositories/IPersonRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteDonorService{
  private personRepository: IPersonRepository;
  constructor(
    @inject('IPersonRepository') 
    personRepository: IPersonRepository){
    this.personRepository = personRepository;
  }
  async execute(phone: string): Promise<void>{
    const person = await this.personRepository.findByEmailOrPhone(phone);
    if(!person){
      throw new AppError('No donor found', 404);
    }
    await this.personRepository.delete(person._id);
  }
}
export default DeleteDonorService;