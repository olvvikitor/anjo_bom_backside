import AppError from '@shared/errors/AppError';
import AdministratorRepository from '../repositories/AdministratorRepository';
import { IAdministrator } from '../entities/Adiministrator';
import {hash} from 'bcryptjs'
interface IRequest{
  name: string;
  email: string;
  password: string;
}
class CreateAdministratorService{
  public async execute({name, email, password}:IRequest){
    const administratorRepository = new AdministratorRepository;
    const adminExists = await administratorRepository.findByEmail(email);

    if(adminExists){
      throw new AppError('Email already exists', 409)
    }
    password = await hash(password, 8)
    const admin = await administratorRepository.createAdministrator({name, email, password} as IAdministrator);

    return admin;
  }
}
export default CreateAdministratorService