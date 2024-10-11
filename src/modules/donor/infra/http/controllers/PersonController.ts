import{Request, Response} from 'express'

import CreatePersonService from '@modules/donor/services/CreatePersonService';
import { container } from 'tsyringe';
import { IAddress } from '@modules/address/domain/models/IAddress';
import { GenerateCodeService } from '@modules/donor/services/GenerateCodeService';
import SendCodeSmsService from '@modules/donor/services/SendCodeSmsService';
import CheckPhoneExistService from '@modules/donor/services/login/CheckPhoneExists';
import AuthDonorService from '@modules/donor/services/login/AuthDonorService';
import GetAllDonorsService from '@modules/donor/services/GetAllDonorsService';
import { IPaginate } from '@shared/domain/paginate/IPaginate';

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

    const phone = request.params.phone

    const code = GenerateCodeService.generateFourDigitCode();

    const semdSmsCodeService = container.resolve(SendCodeSmsService);

    await semdSmsCodeService.execute(code, phone)

    return response.status(200).json({codigo: code});

  }
  public async checkPhoneExist(request: Request, response:Response) : Promise<Response>{
    const checkPhoneExistService = container.resolve(CheckPhoneExistService)
    const phone = request.params.phone;
    const exist = await checkPhoneExistService.execute({phone});
    return response.status(200).json(exist)
  }
  public async getDonor(request:Request, response:Response):Promise<Response>{
    const phone: string = request.params.phone
    const code = request.body.codigo
    const authDonorService = container.resolve(AuthDonorService)
    const donor = await authDonorService.execute({phone, code})
    return response.status(200).json(donor)
  }
  public async getAllDonors(request: Request, response: Response): Promise<Response> {
    const getAllDonorsService = container.resolve(GetAllDonorsService);

    const { page, limit} = request.query;
      const options:IPaginate = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10) 
      }
      
    const donors = await getAllDonorsService.execute(options);
    return response.status(200).json(donors);
  }
}export default PersonConroller;