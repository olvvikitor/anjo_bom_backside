import { ICollectionPoint } from '@modules/collectionPoints/domain/models/ICollectionPoints';
import ICollectionPointRepository from '@modules/collectionPoints/domain/repositories/ICollectionPointRepository'
import CollectionPoint from '../models/CollectionPoints';
import { Model } from 'mongoose';
import { ICreateCollectionPoint } from '@modules/collectionPoints/domain/models/ICreateCollectionPoint';

export default class CollectionPointRepository implements ICollectionPointRepository{
  private model: Model<ICollectionPoint>
  constructor(){
    this.model = CollectionPoint;
  }
  async getCollectionPointByName(name: string): Promise<ICollectionPoint | null> {
    const collectionPoint = await this.model.findOne({name: name});
    return collectionPoint;
  }
 async getAllCollectionPoints(): Promise<ICollectionPoint[]> {
    const collectionPoints = this.model.find();
    return collectionPoints;
  }
 async getCollectionPointById(id: string): Promise<ICollectionPoint | null> {
    const collectionPoint = this.model.findById({_id: id});
    return collectionPoint;
  }
 async createCollectionPoint(point: ICreateCollectionPoint): Promise<ICollectionPoint> {
    const pontoDeColeta = await this.model.create(point);
    await pontoDeColeta.save();
    return pontoDeColeta;
  }
 async updateCollectionPoint(id: string, point: ICollectionPoint): Promise<void> {
    const pontoDeColeta = this.model.findOne({ _id: id });
    await this.model.updateOne({ _id: id }, pontoDeColeta);
  }
  async deleteCollectionPoint(id: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}