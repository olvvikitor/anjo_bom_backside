import AppError from '@shared/errors/AppError';
import {IPerson, IPerson as IPersonModel} from '../entities/Person';
import PersonRepository from '../repository/PersonRepository';
import {hash} from 'bcryptjs'
import {IAddressPerson} from '@modules/donor/entities/AddressPerson';

interface IRequestPerson{
  name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  motivation: string;
  addressPerson: IAddressPerson;
}

class CreatePersonService{
  public async execute({name, last_name, email, phone, password, motivation, addressPerson}:IRequestPerson):Promise<IPersonModel>{
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
    password = await hash(password, 8);

    const person = await personRepository.create({name, last_name, email, phone, password, motivation, 
      addressPerson} as IPerson)
      return person;
    };
}
export default CreatePersonService;