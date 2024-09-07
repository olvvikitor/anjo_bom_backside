import { IPerson } from '@modules/donor/entities/Person';
import AdministratorRepository from '../repositories/AdministratorRepository';
import AppError from '@shared/errors/AppError';
import {auth, SECRET_KEY} from '@shared/http/middleweres/auth'
import { compare } from 'bcryptjs';
import jwt  from 'jsonwebtoken';

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
    const token = jwt.sign({name: admin.name, id: admin._id}, SECRET_KEY,{
      expiresIn: '2 days',
      subject: admin.id
    });

    return {token};
}
}
export default LoginService;