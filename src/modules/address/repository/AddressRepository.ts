import{Model} from 'mongoose'
import Address from '../entities/Address'
import {IAddress as IAddressModel} from '../entities/Address'

class AddressRepository {
  private model: Model<IAddressModel>;

  constructor() {
    this.model = Address;
  }

  public async createAddress(address: IAddressModel): Promise<IAddressModel> {
    const newAddress = await this.model.create(address);
    await newAddress.save();
    return newAddress;
  }
}
export default AddressRepository;