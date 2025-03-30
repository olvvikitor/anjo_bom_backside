import { Model } from 'mongoose';

import Administrator from '../entities/Adiministrator';
import { IAdministrator } from '@modules/administrator/domain/models/IAdministrator';
import { IAdministratorRepository } from '@modules/administrator/domain/repositories/IAdministratorRepository';
import { ICreateAdministrator } from '@modules/administrator/domain/models/ICreateAdministrator';

class AdministratorRepository implements Omit<IAdministratorRepository, 'save'>{

  private model: Model<IAdministrator>;

  constructor(){
    this.model = Administrator;
  }


  async createAdministrator(administrator: ICreateAdministrator): Promise<IAdministrator>{
    const admin = await this.model.create(administrator);
    await admin.save();
    return admin;
  }
  async findByEmail(email: string): Promise<IAdministrator | undefined | null>{
    const admin = await this.model.findOne({email});
    return admin;
  }

  async findAll():Promise<IAdministrator[] | null>{
    const admins = await this.model.find({
      isActive: true
    });
    return admins
  }
  async findById(id:string):Promise<IAdministrator| null | undefined>{
    const admin = await this.model.findById({
      _id: id
    });
    return admin;
  }
  async update(id: string, updateData: IAdministrator): Promise<void>{
    await this.model.updateOne({_id: id}, updateData);
  }
  
}
export default AdministratorRepository;