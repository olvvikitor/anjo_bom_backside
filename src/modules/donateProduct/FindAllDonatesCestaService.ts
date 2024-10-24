import { inject, injectable } from 'tsyringe';
import { ICestaRepository } from './domain/repositories/ICestaRepository';
import { IItemsDonates } from './domain/models/IItemsDonates';
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import { IAddress } from '@modules/address/domain/models/IAddress';

export interface IResponsePerson{
  name: string | null
  telefone: string | null
  address: IAddress | null
}
export interface IDonateResponse{
  produtos: IItemsDonates[]
}

export interface IResponse {
  doador: IResponsePerson;
  items: IDonateResponse
  status: 'COLETADO' | 'PENDENTE'
}

@injectable()
export default class FindAllDonatesCesta {
  constructor(
    @inject('ICestaRepository')
    private cestaRepository: ICestaRepository,
    @inject('IPersonRepository')
    private personRepository: IPersonRepository
  ) { }
  public async execute(): Promise<IResponse[]> {
    const cestas = await this.cestaRepository.findAll()
    return await Promise.all(cestas.map(async (cesta) => {
      console.log(cesta)
      console.log(cesta.person_id)
      let doadoresNaoEncontrados = []

      const doador = await this.personRepository.findById(cesta.person_id)
      
      if (!doador) {
        doadoresNaoEncontrados.push(cesta.person_id)

      }

      const person : IResponsePerson = {
        name: doador?.name || 'Não declarado',
        address: doador?.address || null,
        telefone: doador?.phone || null
      }
      const items: IDonateResponse = {
        produtos: cesta.items
      }

      const response : IResponse = {
        doador: person,
        items,
        status: cesta.status
      }

      return response
    }
    ))

  }
}