import { IAdministrator } from '@modules/administrator/domain/models/IAdministrator';
import { IAdministratorRepository } from '@modules/administrator/domain/repositories/IAdministratorRepository';
import { ICreateAdministrator } from '@modules/administrator/domain/models/ICreateAdministrator';
import Administrator from '@modules/administrator/infra/mongoose/entities/Adiministrator';
import ObjectID from 'bson-objectid';

class FakeAdminRepository implements IAdministratorRepository{
  private admins: IAdministrator[] = [];
  async findAll(): Promise<IAdministrator[] | null> {
    const admins = this.admins;
    return admins;
  }
 async update(id: string, updateData: IAdministrator): Promise<void> {
    let admin = this.admins.find(admin=>admin._id = id);
    admin = updateData;
    this.admins.filter(adm => adm = admin._id, admin);
  }
  
 async save(administrator: IAdministrator): Promise<IAdministrator> {
    Object.assign(this.admins, administrator);
    return administrator
  }
  async createAdministrator(administrator: ICreateAdministrator): Promise<IAdministrator>{
    const admin = new Administrator();
    admin._id = ObjectID();
    admin.name = administrator.name;
    admin.email = administrator.email;
    admin.password = administrator.password;

    this.admins.push(admin);

    return admin;
    }
  async findByEmail(email: string): Promise<IAdministrator | undefined>{
   const admin = this.admins.find(admin => admin.email === email);
   return admin;
  }

  async findById(id:string):Promise<IAdministrator| undefined>{
  
   const admin = this.admins.find(admin =>admin._id == id);
   return admin
  }

  
}
export default FakeAdminRepository;