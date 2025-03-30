import {hash} from 'bcryptjs'
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IAdministrator } from '../domain/models/IAdministrator';
import { ICreateAdministrator } from '../domain/models/ICreateAdministrator';
import { IAdministratorRepository } from '../domain/repositories/IAdministratorRepository';
import { IHashProvider } from '../providers/HashProviders/models/IHashProvider';


@injectable()
class CreateAdministratorService{

  private administratorRepository : IAdministratorRepository;
  private hashprovider: IHashProvider;
  constructor (
    @inject('IAdministratorRepository')
    administratorRepository: IAdministratorRepository,
    @inject('IHashProvider')
    hashprovider:IHashProvider) {
    this.administratorRepository = administratorRepository;
    this.hashprovider = hashprovider
  }
 public async execute({name, email, password}:ICreateAdministrator):Promise<IAdministrator>{

    const adminExists = await  this.administratorRepository.findByEmail(email);

    if(adminExists){
      throw new AppError('Email already exists', 409)
    }

    password = await this.hashprovider.generateHash(password);

    const admin = await  this.administratorRepository.createAdministrator({name, email, password});

    return admin;
  }
}
export default CreateAdministratorService