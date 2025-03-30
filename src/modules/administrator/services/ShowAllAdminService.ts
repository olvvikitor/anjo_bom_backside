import AppError from '@shared/errors/AppError';
import { IAdministrator } from '../domain/models/IAdministrator';
import AdministratorRepository from '../infra/mongoose/repositories/AdministratorRepository';
import { IAdministratorRepository } from '../domain/repositories/IAdministratorRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ShowAllAdminService{
  private administratorRepository : IAdministratorRepository;

  constructor (
    @inject('IAdministratorRepository')
    administratorRepository: IAdministratorRepository) {
    this.administratorRepository = administratorRepository;
  }
  public async showAll(): Promise<IAdministrator[] | null>{
    const admins = await this.administratorRepository.findAll();
    return admins;
  }
}
export default ShowAllAdminService;