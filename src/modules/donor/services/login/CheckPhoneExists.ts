
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import { ISmsService } from '@shared/domain/models/ISmsService';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { GenerateCodeService } from '../GenerateCodeService';

type IRequest = {
  phone:string
}
@injectable()
class CheckPhoneExistService{
  private personRepository : IPersonRepository;
  private sendSmsService : ISmsService;

  constructor(
    @inject('IPersonRepository')
    personRepository : IPersonRepository,
    @inject('ISmsService')
    sendSmsService : ISmsService
    )
  {
    this.personRepository = personRepository;
    this.sendSmsService = sendSmsService;
  }
  public async execute({phone}: IRequest):Promise<String>{

    const person = await this.personRepository.findByEmailOrPhone(phone) 

    if(!person){
      throw new AppError('Telefone não encontrado', 404);
    }
    const code = GenerateCodeService.generateFourDigitCode();
    
    await this.sendSmsService.sendSms(code, phone);
    person.code = code;
    await this.personRepository.update(person._id, person)
    

    return code;
  }
}
export default CheckPhoneExistService;