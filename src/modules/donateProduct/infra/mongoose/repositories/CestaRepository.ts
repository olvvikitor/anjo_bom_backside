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
  public async createCesta(cesta: ICreateCesta): Promise<ICesta> {
    const newCesta = await this.model.create({items: cesta.items, person_id: cesta.person_id});
    await newCesta.save();
    return newCesta;
  }
  public async updateCesta(cestaId: any, cesta: ICesta): Promise<ICesta> {
    throw new Error('Method not implemented.');
  }
  public async deleteCesta(cestaId: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
  public async getCestaById(cestaId: ICesta): Promise<ICesta> {
    throw new Error('Method not implemented.');
  }

}
export default CestaRepository;