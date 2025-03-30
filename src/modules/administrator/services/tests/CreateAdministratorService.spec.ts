import 'reflect-metadata';
import CreateAdministratorService from '../CreateAdministratorService'
import FakeAdminRepository from '@modules/administrator/domain/repositories/fakes/FakeAdminRepository'
import AppError from '@shared/errors/AppError';
import BcryptHashProvider from '@modules/administrator/providers/HashProviders/implementations/BcryptHashProvider';
import { IHashProvider } from '@modules/administrator/providers/HashProviders/models/IHashProvider';
import FakeHashProvider from '@modules/administrator/providers/HashProviders/fakes/FakeHashProvider';



describe('create admin', () => {
  it('espera-se a criação de um novo admin', async () => {
    const fakeAdminRepository = new FakeAdminRepository()
    const hashprovider: IHashProvider = new BcryptHashProvider()
  const createAdminService = new CreateAdministratorService(fakeAdminRepository, hashprovider);
    const admin = await createAdminService.execute({ name: 'testeAdmin', email: 'teste@gmail.com', password: '123456' })
    expect(admin).toHaveProperty('_id')
  });

  it('espera-se não criar um novo admin com o mesmo email', async () => {
    const fakeAdminRepository = new FakeAdminRepository()
    const hashprovider: IHashProvider = new FakeHashProvider()
    const createAdminService = new CreateAdministratorService(fakeAdminRepository, hashprovider);
   const admin =  await createAdminService.execute({ name: 'testeAdmin', email: 'teste@gmail.com', password: '123456' })
    expect(createAdminService.execute({
      name: 'testeAdmin',
      email: 'teste@gmail.com',
      password: '123456'
    }),).rejects.toBeInstanceOf(AppError)

  });
})