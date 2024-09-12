import AppError from '@shared/errors/AppError';

import PersonRepository from '../../repository/PersonRepository';

import { sendSms } from '@shared/services/SendSms'

interface IRequest{
  param: string,
}
interface IResponse{
  phone: string
}
class LoginService{

  public async execute({param}:IRequest): Promise<IResponse>{
    
    const personRepository = new PersonRepository();

    const person = await personRepository.findByEmailOrPhone(param);

    if(!person){
      throw new AppError('No Person found', 404);
    }
     const code = this.generateFourDigitCode();

     await sendSms(code);

     person.code = code;

     const id = person._id as unknown as string;
     
     await personRepository.update(id, person);

     const phone = param

     //Enviando o telefone para a resposta
     return {phone};
     
  }
 
  private generateFourDigitCode() {
    const code = Math.floor(1000 + Math.random() * 9000);
    return code.toString().padStart(4, '0');
  }
  
}
export default LoginService;