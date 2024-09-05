import DonorRepository from '@modules/donor/repository/DonorRepository';
import AddressRepository from '../repository/AddressRepository';
import { IAddress } from '../entities/Address';
import { IAddress as IAddressModel} from '../entities/Address';

interface IRequestDonorAddress{
  cep?: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}
class CreateAddressService{
  public async execute({cep, estado, cidade, bairro, rua, numero }:IRequestDonorAddress):Promise<IAddressModel>{
    const addressRepository = new AddressRepository();

    const address = await addressRepository.createAddress({cep, estado, cidade, bairro, rua, numero} as IAddressModel)
    
    return address;
  }
}
export default CreateAddressService;