import { IAdministrator } from '../models/IAdministrator'

export interface IAdministratorRepository{
  
createAdministrator(administrator: IAdministrator): Promise<IAdministrator>

findByEmail(email: string): Promise<IAdministrator | null>

findAll():Promise<IAdministrator[] | null>

findById(id:string):Promise<IAdministrator| null>

update(id: string, updateData: IAdministrator): Promise<void>

}