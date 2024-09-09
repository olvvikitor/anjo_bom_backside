import AppError from '@shared/errors/AppError';
import AdministratorRepository from '../repositories/AdministratorRepository';

interface IRequest{
  id: string
}
class UpdtateStatusAdmin{
  public async execute({id}: IRequest):Promise<void>{
    const adminRepository = new AdministratorRepository();

    const admin = await adminRepository.findById(id);

    if(!admin){
      throw new AppError('No admin found', 404);
    }
    
    admin.isActive = !admin.isActive;

    await adminRepository.update(id, admin);
  }
}
export default UpdtateStatusAdmin;