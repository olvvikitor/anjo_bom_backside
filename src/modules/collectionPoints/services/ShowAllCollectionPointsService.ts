import { inject, injectable } from 'tsyringe';
import ICollectionPointRepository from '../domain/repositories/ICollectionPointRepository';
import AppError from '@shared/errors/AppError';
import { IShowCollectionPoint } from '@modules/collectionPoints/domain/models/IShowCollectionPoint';
@injectable()
class ShowAllCollectionPointsService {
  private collectionPointRepository: ICollectionPointRepository;

  constructor(
    @inject('ICollectionPointRepository')
    collectionPointRepository: ICollectionPointRepository) {
      this.collectionPointRepository = collectionPointRepository;
    }
  public async execute():Promise<IShowCollectionPoint[]>{

    const collectionsPoints = await this.collectionPointRepository.getAllCollectionPoints();

    if(!collectionsPoints?.length){
      throw new AppError('not found collection points',404);
    }
    return collectionsPoints.map((col)=>{
      return {
        id: col._id,
        name: col.name,
        urlMap: col.urlMap,
        address: col.address,
      }
    })
  }
}
export default ShowAllCollectionPointsService;