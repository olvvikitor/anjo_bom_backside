import AppError from '@shared/errors/AppError';

import { compare } from 'bcryptjs';
import jwt  from 'jsonwebtoken';

import { SECRET_KEY } from '@shared/infra/http/middleweres/auth';
import { IAdministratorRepository } from '../domain/repositories/IAdministratorRepository';
import { inject, injectable } from 'tsyringe';
import { IToken } from '@shared/domain/models/IToken';

export interface IRequest {
  email:string;
  password:string;
}
interface IResponse{
  token: string
}
@injectable()
class LoginService{
  private administratorRepository : IAdministratorRepository;
  private tokenService : IToken
  constructor (
    @inject('IAdministratorRepository')
    administratorRepository: IAdministratorRepository,
    @inject('ITokenService')
    tokenService: IToken
  ) {
    this.administratorRepository = administratorRepository;
    this.tokenService = tokenService;
  }
  public async execute({email, password}: IRequest): Promise<IResponse>{
    
    const admin = await this.administratorRepository.findByEmail(email);
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
    const adminId = admin._id.toString()
    
    const token = this.tokenService.generateToken({name: admin.name, id: admin._id, isActive: admin.isActive},
      adminId
    );
    return {token};
}
}
export default LoginService;