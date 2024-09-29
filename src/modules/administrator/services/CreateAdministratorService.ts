import {hash} from 'bcryptjs'
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IAdministrator } from '../domain/models/IAdministrator';
import { ICreateAdministrator } from '../domain/models/ICreateAdministrator';
import { IAdministratorRepository } from '../domain/repositories/IAdministratorRepository';


@injectable()
class CreateAdministratorService{

  private administratorRepository : IAdministratorRepository;

  constructor (
    @inject('IAdministratorRepository')
    administratorRepository: IAdministratorRepository) {
    this.administratorRepository = administratorRepository;
  }
  public async execute({name, email, password}:ICreateAdministrator){

    const adminExists = await  this.administratorRepository.findByEmail(email);

    if(adminExists){
      throw new AppError('Email already exists', 409)
    }

    password = await hash(password, 8)

    const admin = await  this.administratorRepository.createAdministrator({name, email, password} as IAdministrator);

    return admin;
  }
}
export default CreateAdministratorService