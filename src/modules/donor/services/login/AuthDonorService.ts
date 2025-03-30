import { IAddress } from '@modules/address/domain/models/IAddress';
import { IPerson } from '@modules/donor/domain/models/IPerson';
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

export type IResponse = {
  id: string;
  address: IAddress;
}
type IRequest = {
  phone:string;
  code: string
}
@injectable()
class AuthDonorService{
  private personRepository : IPersonRepository;
  constructor(
    @inject('IPersonRepository')
    personRepository : IPersonRepository
  ){
    this.personRepository = personRepository;
  }
  public async execute({phone, code}: IRequest):Promise<IResponse>{

    const person = await this.personRepository.findByEmailOrPhone(phone) 

    if(!person){
      throw new AppError('Telefone não encontrado', 404);
    }
    if(person.code != code){
      throw new AppError('Código inválido', 403);

    }
    const personResponse : IResponse = {
      id: person._id,
      address: person.address as IAddress
    }

    return personResponse;
  }
}
export default AuthDonorService;