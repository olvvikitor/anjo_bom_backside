import { IAdministrator } from '../models/IAdministrator'
import { ICreateAdministrator } from '../models/ICreateAdministrator'

export interface IAdministratorRepository{
  
createAdministrator(administrator: ICreateAdministrator): Promise<IAdministrator>

save(administrator: IAdministrator): Promise<IAdministrator>

findByEmail(email: string): Promise<IAdministrator | undefined | null>

findAll():Promise<IAdministrator[] | null>

findById(id:string):Promise<IAdministrator | undefined | null>

update(id: string, updateData: IAdministrator): Promise<void>

}