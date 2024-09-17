import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IAdministratorRepository } from '../domain/repositories/IAdministratorRepository';


interface IRequest{
  id: string
}
@injectable()
class UpdtateStatusAdmin{
  private administratorRepository : IAdministratorRepository;

  constructor (
    @inject('IAdministratorRepository')
    administratorRepository: IAdministratorRepository) {
    this.administratorRepository = administratorRepository;
  }
  public async execute({id}: IRequest):Promise<void>{


    const admin = await this.administratorRepository.findById(id);

    if(!admin){
      throw new AppError('No admin found', 404);
    }
    
    admin.isActive = !admin.isActive;

    await this.administratorRepository.update(id, admin);
    
  }
}
export default UpdtateStatusAdmin;