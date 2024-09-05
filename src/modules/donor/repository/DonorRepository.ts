import { Model } from 'mongoose';
import Donor from '../entities/Donor';
import {IDonor as IDonorModel} from '../entities/Donor';


class DonorRepository {

  private model: Model<IDonorModel>;

  constructor() {
    this.model = Donor;
  }

  async create(donor:IDonorModel): Promise<IDonorModel> {
     const donors = await this.model.create(donor);
     await donors.save();
     return donors;
  }

  async findById(id: string): Promise<IDonorModel | null> {
    const donor = await this.model.findById(id).exec();
    return donor;
  }

  async findAll(): Promise<IDonorModel[]> {
    const donor = await this.model.find().exec();
    return donor
  }

  async update(id: string, updateData: Partial<IDonorModel>): Promise<IDonorModel | null> {
    const donor = await this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
    return donor;
  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
  async findByEmail(email: string): Promise<IDonorModel | null> {
    const donor = await this.model.findOne({ email });
    return donor;
  }
}

export default DonorRepository;
