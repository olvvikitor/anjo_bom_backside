import { inject, injectable } from 'tsyringe';
import ICollectionPointRepository from '../domain/repositories/ICollectionPointRepository';
import { ICreateCollectionPoint } from '../domain/models/ICreateCollectionPoint';
import AppError from '@shared/errors/AppError';
import { ICollectionPoint } from '../domain/models/ICollectionPoints';

@injectable()
export class UpdateCollectionPointsService{
  constructor(
    @inject('ICollectionPointRepository')
    private collectionPointsRepository: ICollectionPointRepository
  ){
    this.collectionPointsRepository = collectionPointsRepository;
  }
  async execute(id: string,point : ICreateCollectionPoint):Promise<void>{
    const poontDeColeta = await this.collectionPointsRepository.getCollectionPointById(id);
    if(!poontDeColeta){
      throw new AppError('Ponto de coleta não encontrado')
    }
    await this.collectionPointsRepository.updateCollectionPoint(id, point)
  }
}