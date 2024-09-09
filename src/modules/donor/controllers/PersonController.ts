import{Request, Response} from 'express'
import CreatePersonService from '../services/CreatePersonService';
import FindPersonService from '../services/FindPersonService';
import { IAddress } from '@modules/address/entities/Address';
class PersonConroller{
  public async createPerson(request:Request, response: Response):Promise<Response>{
    const createPersonService = new CreatePersonService;
    
    const {name, last_name, email,phone, password, motivation, address} = request.body;
  
    const { cep, estado, cidade, bairro, rua, numero } = address;

    const personData = {
      name,
      last_name,
      email,
      phone,
      password,
      motivation,
      address: { cep, estado, cidade, bairro, rua, numero }as unknown as IAddress,
      
    }

    const person = await createPersonService.execute(personData);
    return response.status(200).json(person);
    
  }
}export default PersonConroller;