import AppError from '@shared/errors/AppError';
import {IPerson as IPersonModel} from '../entities/Person';
import PersonRepository from '../repository/PersonRepository';
import {compare} from 'bcryptjs'
import { SECRET_KEY } from '@shared/http/middleweres/auth';

import jwt from 'jsonwebtoken';

interface IRequest{
  param: string,
  password: string
}
interface IResponse{
  token: string;
}

class LoginService{
  public async execute({param, password}:IRequest): Promise<IResponse>{
    const personRepository = new PersonRepository();

    const person = await personRepository.findPass(param);

    if(!person){
      throw new AppError('No Person found', 404);
    }
    
    const confirmPassword = await compare(password, person.password);

    if(!confirmPassword){
      throw new AppError('Invalid password', 401);
    }
    const token = jwt.sign({name: person.name}, SECRET_KEY, {
      expiresIn: '2 days',
      subject: person.id
    });
   
    return {token};
  }
}
export default LoginService;