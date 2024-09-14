import { Model } from 'mongoose';
import DonateWithPix, { IDonateWithPix } from '../entities/DonateWithPix';

class DonateRepository{
  private model : Model<IDonateWithPix>;

  constructor(){

    this.model = DonateWithPix;

  }
  public async saveDonateWithPix(transationData: IDonateWithPix): Promise<IDonateWithPix>{
    const newExtract = await this.model.create(transationData);
    await newExtract.save();
    return newExtract;
  }
  public async findByIdPix(id:number):Promise<IDonateWithPix | null>{
    const updatedExtract = await this.model.findOne({id_pix : id});
    return updatedExtract;
  }
  public async updateDonateWithPix(transationData: IDonateWithPix): Promise<void>{
    const updatedExtract = await this.model.updateOne({_id : transationData._id}, transationData);
    
  }
}
export default DonateRepository;