import AppError from '@shared/errors/AppError';
import { IAdministrator } from '../domain/models/IAdministrator';
import AdministratorRepository from '../infra/mongoose/repositories/AdministratorRepository';


class ShowAllAdmin{
  public async showAll(): Promise<IAdministrator[] | null>{
    const adminRepository = new AdministratorRepository();
    
    const admins = await adminRepository.findAll();
    return admins;
  }
}
export default ShowAllAdmin;