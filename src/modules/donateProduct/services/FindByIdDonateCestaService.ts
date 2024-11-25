import { inject, injectable } from 'tsyringe';
import CestaRepository from '../infra/mongoose/repositories/CestaRepository';
import { ICestaRepository } from '../domain/repositories/ICestaRepository';
import AppError from '@shared/errors/AppError';


@injectable()
export class FindByIdDonateCestaService{
  constructor(
    @inject('ICestaRepository')
    private cestaRepository:ICestaRepository){}
  async execute(id:string):Promise<void>{
    const cesta = await this.cestaRepository.getCestaById(id)
    if(!cesta){
      throw new AppError('Cesta não encontrada')
    }
    if(cesta.status === 'COLETADO'){
      throw new AppError('Indisponivel')
    }
    cesta.status = 'COLETADO'

    await this.cestaRepository.updateCesta(cesta._id, cesta)

  }
}