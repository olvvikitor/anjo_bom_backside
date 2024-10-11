import 'reflect-metadata';
import FakeAdminRepository from '@modules/administrator/domain/repositories/fakes/FakeAdminRepository';
import UpdtateStatusAdmin from '../UpdateStatusAdmin';
import CreateAdministratorService from '../CreateAdministratorService';
import ObjectID from 'bson-objectid';
import AppError from '@shared/errors/AppError';
import BcryptHashProvider from '@modules/administrator/providers/HashProviders/implementations/BcryptHashProvider';
import { IHashProvider } from '@modules/administrator/providers/HashProviders/models/IHashProvider';
import FakeHashProvider from '@modules/administrator/providers/HashProviders/fakes/FakeHashProvider';


let updateAdminService: UpdtateStatusAdmin;
let fakeAdminRepository: FakeAdminRepository;
describe("testando update de adiministradores",  ()=>{
  fakeAdminRepository  = new FakeAdminRepository()
  const hashprovider: IHashProvider = new FakeHashProvider()
  const createAdminService = new CreateAdministratorService(fakeAdminRepository, hashprovider);

  updateAdminService = new UpdtateStatusAdmin(fakeAdminRepository)
  it("Espera-se atualizar. Testando a autualizacção para intativar um administrador",async()=>{
    const adminTest = await createAdminService.execute({name:'admin teste', email:'adminteste@gmail.com', password:'123456'})
    const idString = adminTest._id.toString();
    await updateAdminService.execute({id: idString});
    expect(await fakeAdminRepository.findById(idString).then(p => p?.isActive)).toBeFalsy();
  })
  it("Espera-se não atualizar devido a o administrador nãos er localizado.", async()=>{
    let idTest = ObjectID()
    let idParse = idTest.toString();
    expect(updateAdminService.execute({id: idParse})).rejects.toBeInstanceOf(AppError)
  })
})