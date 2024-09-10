import AppError from '@shared/errors/AppError';
import {IPerson, IPerson as IPersonModel} from '../entities/Person';
import PersonRepository from '../repository/PersonRepository';
import {hash} from 'bcryptjs'
import {IAddress} from '@modules/address/entities/Address';

interface IRequestPerson{
  name: string;
  last_name: string;
  email: string;
  phone: string;
  motivation: string;
  address: IAddress;
}

class CreatePersonService{
  public async execute({name, last_name, email, phone, motivation, address}:IRequestPerson):Promise<IPersonModel>{
    const personRepository = new PersonRepository();
 const emailExists = await personRepository.findByEmailOrPhone(email);
 if (emailExists) {
   throw new AppError('Email in use', 409);
 }
 const phoneExists = await personRepository.findByEmailOrPhone(phone);
 if (phoneExists) {
   throw new AppError('Phone in use', 409);
 }
    //criptografando a senha recebida da requisição
    const person = await personRepository.create({name, last_name, email, phone, motivation, 
      address} as IPerson)
      return person;
    };
}
export default CreatePersonService;