import 'reflect-metadata';
import FakeAdminRepository from '@modules/administrator/domain/repositories/fakes/FakeAdminRepository';
import ShowAllAdminService from '../ShowAllAdminService';
import CreateAdministratorService from '../CreateAdministratorService';
import { IHashProvider } from '@modules/administrator/providers/HashProviders/models/IHashProvider';
import BcryptHashProvider from '@modules/administrator/providers/HashProviders/implementations/BcryptHashProvider';

describe('busca por todos administradores ativos', () => {
  let fakeAdminRepository: FakeAdminRepository;
  let showAllAdminService: ShowAllAdminService;
  let createAdminService: CreateAdministratorService;

  beforeEach(() => {
    fakeAdminRepository = new FakeAdminRepository();
    showAllAdminService = new ShowAllAdminService(fakeAdminRepository);
    const hashprovider: IHashProvider = new BcryptHashProvider()
    createAdminService = new CreateAdministratorService(fakeAdminRepository, hashprovider);
  });

  it('espera-se retornar todos administradores ativos', async () => {
    // Criar administradores
    await createAdminService.execute({ name: 'testeAdmin', email: 'teste@gmail.com', password: '123456' });
    await createAdminService.execute({ name: 'testeAdmin2', email: 'teste2@gmail.com', password: '123456' });

    // Chamar o serviço para buscar todos os administradores
    const admins = await showAllAdminService.showAll();

    // Verificações
    expect(admins).not.toBeNull();
    expect(Array.isArray(admins)).toBe(true);
    expect(admins!.length).toBe(2);
  });
});
