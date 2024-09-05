import AppError from '@shared/errors/AppError';
import {IDonor, IDonor as IDonorModel} from '../entities/Donor';
import DonorRepository from '../repository/DonorRepository';
import {hash} from 'bcryptjs'
import AddressRepository from '@modules/address/repository/AddressRepository';
import {IAddress} from '@modules/address/entities/Address';
import { ObjectId } from 'mongoose';

interface IRequestDonorAddress{
  cep?: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}
interface IRequestDonor{
  name: string;
  last_name: string;
  email: string;
  password: string;
  motivation: string;
  address: IRequestDonorAddress[];
}

class CreateDonorService{
  public async execute({name, last_name,email, password, motivation, address}:IRequestDonor):Promise<IDonorModel>{
    const donorRepository = new DonorRepository();
    const addressRepository = new AddressRepository();
    const donorExist = await donorRepository.findByEmail(email);

    if(donorExist){
      throw new AppError('Email already exists', 409);
    }
    //criptografando a senha recebida da requisição
    password = await hash(password, 8);
    
    const addressIds = await Promise.all(
      address.map(async (addr) => {
        const newAddress = await addressRepository.createAddress(addr as IAddress);
        return newAddress._id;
      })
    ) 

    const donor = await donorRepository.create({name, last_name, email, password, motivation, 
      address:addressIds} as unknown as IDonorModel);
      return donor;
  }
}
export default CreateDonorService;