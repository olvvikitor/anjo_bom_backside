import { ICesta } from '../models/ICesta'
import { ICreateCesta } from '../models/ICreateCesta'

export interface ICestaRepository{
  createCesta(cesta: ICreateCesta): Promise<ICesta>
  updateCesta(cestaId: any, cesta: ICesta): Promise<void>
  deleteCesta(cestaId: any): Promise<any>
  getCestaById(cestaId: any): Promise<ICesta | null>
  findAll():Promise<ICesta[]>
}