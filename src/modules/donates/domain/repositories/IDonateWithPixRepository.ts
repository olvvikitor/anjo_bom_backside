import { IPaginate } from '@shared/domain/paginate/IPaginate'
import { IDonateWithPix } from '../models/IDonateWithPix'

export interface IDonateWithPixRepository{
  
   saveDonateWithPix(transationData: IDonateWithPix): Promise<IDonateWithPix>

   findByIdPix(id:number):Promise<IDonateWithPix | null>

   updateDonateWithPix(id:any , transationData: IDonateWithPix): Promise<void>

   findAll(): Promise<IDonateWithPix[] | null>

   findAllApproved(options:IPaginate): Promise<IDonateWithPix[] | null>
}