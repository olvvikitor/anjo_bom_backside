import { Model } from 'mongoose';
import { IDonateWithPixRepository } from '@modules/donates/domain/repositories/IDonateWithPixRepository';
import { IDonateWithPix } from '@modules/donates/domain/models/IDonateWithPix';
import DonateWithPix from '../entities/DonateWithPix';


class DonateWithPixRepository implements IDonateWithPixRepository{
  
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
  public async updateDonateWithPix(id:string,transationData: IDonateWithPix): Promise<void>{
     await this.model.updateOne({_id : id}, transationData);
  }
  public async findAll(): Promise<IDonateWithPix[] | null>{
    const allExtracts = await this.model.find();
    return allExtracts;
  }
  public async findAllApproved(): Promise<IDonateWithPix[] | null>{
    const allExtactsApproved = await this.model.find({
      status: 'approved'
    });
    return allExtactsApproved;
  }
}
export default DonateWithPixRepository;