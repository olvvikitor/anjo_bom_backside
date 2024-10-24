import { ICesta } from '../models/ICesta'
import { ICreateCesta } from '../models/ICreateCesta'

export interface ICestaRepository{
  createCesta(cesta: ICreateCesta): Promise<ICesta>
  updateCesta(cestaId: any, cesta: ICesta): Promise<ICesta>
  deleteCesta(cestaId: any): Promise<any>
  getCestaById(cestaId: ICesta): Promise<ICesta>
  findAll():Promise<ICesta[]>
}