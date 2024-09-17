import { IPerson } from '@modules/donor/entities/Person';

import AppError from '@shared/errors/AppError';

import { compare } from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import AdministratorRepository from '../infra/mongoose/repositories/AdministratorRepository';
import { SECRET_KEY } from '@shared/infra/http/middleweres/auth';

export interface IRequest {
  email:string;
  password:string;
}
interface IResponse{
  token: string
}
class LoginService{
  public async execute({email, password}: IRequest): Promise<IResponse>{
    const administratorRepository = new AdministratorRepository();
    const admin = await administratorRepository.findByEmail(email);
    if(!admin){
      throw new AppError('No Person found', 404);
    }
    const confirmPassword = await compare(password, admin.password);
    if(!confirmPassword){
      throw new AppError('Invalid password', 401);
    }
    if(admin.isActive == false){
      throw new AppError('Account is inactive', 401);
    }
    const token = jwt.sign({name: admin.name, id: admin._id}, SECRET_KEY,{
      expiresIn: '2 days',
      subject: admin.id
    });

    return {token};
}
}
export default LoginService;