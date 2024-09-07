import { Model } from 'mongoose';
import Administrator, { IAdministrator } from '../entities/Adiministrator';

class AdministratorRepository{

  private model: Model<IAdministrator>;

  constructor(){
    this.model = Administrator;
  }

  async createAdministrator(administrator: IAdministrator): Promise<IAdministrator>{
    const admin = await this.model.create(administrator);
    await admin.save();
    return admin;
  }
  async findByEmail(email: string): Promise<IAdministrator | null>{
    const admin = await this.model.findOne({email});
    return admin;
  }
  
}
export default AdministratorRepository;