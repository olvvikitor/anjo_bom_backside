import { IPaginate } from '@shared/paginate/IPaginate'
import { IEvento } from '../models/IEvento'

export interface IEventoRepository{
   createEvent(event: IEvento): Promise<IEvento> 
   uploadEvent(event: IEvento): Promise<IEvento>
   showAll(options: IPaginate):Promise<IEvento[]> 
   delete(id:string):Promise<void>
   findById(id: string): Promise<IEvento | null>

}