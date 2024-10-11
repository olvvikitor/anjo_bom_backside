import 'reflect-metadata';
import FakeAdminRepository from '@modules/administrator/domain/repositories/fakes/FakeAdminRepository';
import UpdtateStatusAdmin from '../UpdateStatusAdmin';
import CreateAdministratorService from '../CreateAdministratorService';
import ObjectID from 'bson-objectid';
import AppError from '@shared/errors/AppError';
import LoginAdministratorService from '../LoginAdministratorService';
import { JWTTokenService } from '@shared/infra/services/JWTService';
import { IToken } from '@shared/domain/models/IToken';
import FakeHashProvider from '@modules/administrator/providers/HashProviders/fakes/FakeHashProvider';
import { IHashProvider } from '@modules/administrator/providers/HashProviders/models/IHashProvider';

let createAdminService: CreateAdministratorService;
let loginAdminService: LoginAdministratorService;
let updateAdminService: UpdtateStatusAdmin;
let fakeAdminRepository: FakeAdminRepository;
let jwtService: IToken;
let hashprovider: IHashProvider 

describe("testando login de adiministradores",  ()=>{
  beforeEach(()=>{
    fakeAdminRepository  = new FakeAdminRepository()
    jwtService = new JWTTokenService;
    hashprovider = new FakeHashProvider()
    loginAdminService = new LoginAdministratorService(fakeAdminRepository, jwtService, hashprovider);
    createAdminService = new CreateAdministratorService(fakeAdminRepository, hashprovider);
    updateAdminService = new UpdtateStatusAdmin(fakeAdminRepository)
  })
  it("Espera-se retornar um token. Testando a autenticação para administrador",async()=>{
    await createAdminService.execute({name: 'testeAdmin', email: 'teste@gmail.com', password: '123456'});
    const response = await loginAdminService.execute({email:'teste@gmail.com', password: '123456'})
    expect(response).toHaveProperty('token')
  })
  it("Espera-se Erro, Admin não encontrado",async()=>{
    await createAdminService.execute({name: 'testeAdmin', email: 'teste@gmail.com', password: '123456'});
    expect(loginAdminService.execute({email:'errado@gmail.com', password: '123456'}))
    .rejects.toBeInstanceOf(AppError)
  })
  it("Espera-se Erro, password errado",async()=>{
    await createAdminService.execute({name: 'testeAdmin', email: 'teste@gmail.com', password: '123456'});
    expect(loginAdminService.execute({email:'teste@gmail.com', password: '123456789'}))
    .rejects.toBeInstanceOf(AppError)
  })
  it("Espera-se erro, Login com status desativado", async()=>{
    const test = await createAdminService.execute({name: 'testeAdmin', email: 'teste@gmail.com', password: '123456'});
    const idParse = test._id.toString();
    await updateAdminService.execute({id: idParse})
    expect(loginAdminService.execute({email:'teste@gmail.com', password: '123456'}))
    .rejects.toBeInstanceOf(AppError)
  })
  
  
})