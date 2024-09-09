import { IAdministrator } from '../entities/Adiministrator';
import AdministratorRepository from '../repositories/AdministratorRepository';

class ShowAllAdmin{
  public async showAll(): Promise<IAdministrator[] | null>{
    const adminRepository = new AdministratorRepository();
    const admins = await adminRepository.findAll();
    return admins;
  }
}
export default ShowAllAdmin;