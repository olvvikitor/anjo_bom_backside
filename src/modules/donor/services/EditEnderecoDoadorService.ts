import { inject, injectable } from 'tsyringe';
import { IPersonRepository } from '../domain/repositories/IPersonRepository';
import AppError from '@shared/errors/AppError';

export interface IRequest{
  cep:string,
  estado:string,
  cidade:string,
  bairro:string,
  rua:string,
  numero:string,
}

@injectable()
export class EditEnderecoDoadorService{
  constructor (
    @inject('IPersonRepository')
    private doadorRepository:IPersonRepository) {
  }
  async execute(id:string,body:IRequest ):Promise<void>{
    const user = await this.doadorRepository.findById(id)
    if(!user){
      throw new AppError('Usuario não encontrado', 404)
    }
    user.address.bairro = body.bairro
    user.address.cep = body.cep
    user.address.cidade = body.cidade
    user.address.estado = body.estado
    user.address.numero = body.rua
    user.address.rua = body.rua

    await this.doadorRepository.update(user._id, user)
  }

}