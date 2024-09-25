import { inject, injectable } from 'tsyringe';
import ICollectionPointRepository from '../domain/repositories/ICollectionPointRepository';
import { ICollectionPoint } from '../domain/models/ICollectionPoints';
import AppError from '@shared/errors/AppError';
import { ICreateCollectionPoint } from '../domain/models/ICreateCollectionPoint';
import { IShowCollectionPoint } from '@modules/address/domain/models/IShowCollectionPoint';

@injectable()
export default class CreateCollectionPointService{
  private collectionPointRepository: ICollectionPointRepository;
  constructor(
    @inject('ICollectionPointRepository')
    collectionPointRepository: ICollectionPointRepository){
    this.collectionPointRepository = collectionPointRepository;
    }
  public async execute(point: ICreateCollectionPoint): Promise<IShowCollectionPoint> {
    const collectionPointExists = await this.collectionPointRepository.getCollectionPointByName(point.name);
    if(collectionPointExists){
      throw new AppError('Collection point already exists', 409);
    }
    const createdPoint = await this.collectionPointRepository.createCollectionPoint(point);

    const showPoint: IShowCollectionPoint = {
      name: createdPoint.name,
      address: createdPoint.address,
    }
    
    return showPoint;
  }
}