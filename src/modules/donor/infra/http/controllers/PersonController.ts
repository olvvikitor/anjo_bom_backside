import{Request, Response} from 'express'

import CreatePersonService from '@modules/donor/services/CreatePersonService';
import { container } from 'tsyringe';
import { IAddress } from '@modules/address/domain/models/IAddress';
import { GenerateCodeService } from '@modules/donor/services/GenerateCodeService';
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
      address: { cep, estado, cidade, bairro, rua, numero } as IAddress,
      
    }
    const person = await createPersonService.execute(personData);
    return response.status(200).json(person);

  }
  public async generateCode(request:Request, response: Response):Promise<Response>{
    const generateCode = container.resolve(GenerateCodeService)
    const code = generateCode.generateFourDigitCode();
    return response.status(200).json(code);
  }
  
}export default PersonConroller;