import { ICesta } from '@modules/donateProduct/domain/models/ICesta';
import { ICestaRepository } from '@modules/donateProduct/domain/repositories/ICestaRepository';
import { Model } from 'mongoose';
import Cesta from '../entities/Cesta';
import { ICreateCesta } from '@modules/donateProduct/domain/models/ICreateCesta';

class CestaRepository implements ICestaRepository{
  private model :Model<ICesta>
  constructor(){
    this.model = Cesta;
  }
  async findAll(): Promise<ICesta[]> {
    return await this.model.find()
  }
  public async createCesta(cesta: ICreateCesta): Promise<ICesta> {
    const newCesta = await this.model.create({items: cesta.items, person_id: cesta.person_id});
    await newCesta.save();
    return newCesta;
  }
  public async updateCesta(cestaId: any, cesta: ICesta): Promise<void> {
     await this.model.updateOne({_id: cestaId}, cesta)
  }
  public async deleteCesta(cestaId: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async getCestaById(cestaId: any): Promise<ICesta | null> {
    return await this.model.findOne({
      _id: cestaId
    })
  }

}
export default CestaRepository;