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

  async findAll():Promise<IAdministrator[] | null>{
    const admins = await this.model.find({
      isActive: true
    });
    return admins
  }
  async findById(id:string):Promise<IAdministrator| null>{
    console.log('repositorio');
    console.log(id);
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