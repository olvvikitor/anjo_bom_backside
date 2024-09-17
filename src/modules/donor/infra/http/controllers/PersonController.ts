import{Request, Response} from 'express'

import { IAddress } from '@modules/address/entities/Address';
import CreatePersonService from '@modules/donor/services/CreatePersonService';
import { container } from 'tsyringe';
class PersonConroller{
  public async createPerson(request:Request, response: Response):Promise<Response>{
    const createPersonService = container.resolve(CreatePersonService)
    
    const {name, last_name, email,phone, motivation, address} = request.body;
  
    const { cep, estado, cidade, bairro, rua, numero } = address;

    const personData = {
      name,
      last_name,
      email,
      phone,
      motivation,
      address: { cep, estado, cidade, bairro, rua, numero }as unknown as IAddress,
      
    }

    const person = await createPersonService.execute(personData);
    return response.status(200).json(person);
    
  }
  
}export default PersonConroller;