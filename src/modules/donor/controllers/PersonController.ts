import{Request, Response} from 'express'
import CreatePersonService from '../services/CreatePersonService';
import FindPersonService from '../services/FindPersonService';
import { IAddressPerson } from '@modules/donor/entities/AddressPerson';
class PersonConroller{
  public async createPerson(request:Request, response: Response):Promise<Response>{
    const createPersonService = new CreatePersonService;
    
    const {name, last_name, email,phone, password, motivation, addressPerson} = request.body;
  
    const { cep, estado, cidade, bairro, rua, numero } = addressPerson;

    const personData = {
      name,
      last_name,
      email,
      phone,
      password,
      motivation,
      addressPerson: { cep, estado, cidade, bairro, rua, numero }as unknown as IAddressPerson,
      
    }

    const person = await createPersonService.execute(personData);
    return response.status(200).json(person);
    
  }
  public async findByEmail(request:Request, response:Response): Promise<Response> {
    const findDonerByEmailService = new FindPersonService;
    const {param} = request.body;
    const person = await findDonerByEmailService.execute({param});
    return response.status(200).json(person);
  }
}export default PersonConroller;