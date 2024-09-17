import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import AppError from '@shared/errors/AppError';



import { sendSms } from '@shared/services/SendSms'
import { inject, injectable } from 'tsyringe';

interface IRequest{
  param: string,
}
interface IResponse{
  phone: string
}
@injectable()
class LoginService{
  private personRepository: IPersonRepository;
  constructor(@inject('IPersonRepository')
    personRepository: IPersonRepository) {
    this.personRepository = personRepository;
  }
  public async execute({param}:IRequest): Promise<IResponse>{
    
    const person = await this.personRepository.findByEmailOrPhone(param);

    if(!person){
      throw new AppError('No Person found', 404);
    }
     const code = this.generateFourDigitCode();

    sendSms(code);

     person.code = code;

     const id = person._id as unknown as string;
     
     await this.personRepository.update(id, person);

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