import AppError from '@shared/errors/AppError';

import { IPerson } from '../domain/models/IPerson';
import { inject, injectable } from 'tsyringe';
import { IPersonRepository } from '../domain/repositories/IPersonRepository';
import { IAddress } from '@modules/address/domain/models/IAddress';

interface IRequestPerson{
  name: string;
  last_name: string;
  email: string;
  phone: string;
  motivation: string;
  address: IAddress;
}

@injectable()
class CreatePersonService{
  private personRepository: IPersonRepository;
  constructor(@inject('IPersonRepository')
    personRepository: IPersonRepository) {
    this.personRepository = personRepository;
  }
  public async execute({name, last_name, email, phone, motivation, address}:IRequestPerson):Promise<IPerson>{
    
 const emailExists = await this.personRepository.findByEmailOrPhone(email);
 if (emailExists) {
   throw new AppError('Email in use', 409);
 }
 const phoneExists = await this.personRepository.findByEmailOrPhone(phone);
 if (phoneExists) {
   throw new AppError('Phone in use', 409);
 }
    //criptografando a senha recebida da requisição
    const person = await this.personRepository.create({name, last_name, email, phone, motivation, 
      address} as IPerson)
      return person;
    };
}
export default CreatePersonService;