import { IPaginate } from '@shared/domain/paginate/IPaginate'
import { IEvento } from '../models/IEvento'
import { IUpdateEvento } from '../models/IUpdateEvento'

export interface IEventoRepository{
   createEvent(event: IEvento): Promise<IEvento> 
   uploadEvent(event: IEvento): Promise<IEvento>
   showAllPaginate(options?: IPaginate):Promise<IEvento[]> 
   showAll():Promise<IEvento[]>
   delete(id:string):Promise<void>
   findById(id: string): Promise<IEvento | null>
   update(id:string, evento: IUpdateEvento) :Promise<IEvento|null>

}