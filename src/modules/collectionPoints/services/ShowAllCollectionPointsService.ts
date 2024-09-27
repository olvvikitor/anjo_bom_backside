import { inject, injectable } from 'tsyringe';
import ICollectionPointRepository from '../domain/repositories/ICollectionPointRepository';
import AppError from '@shared/errors/AppError';
import { IShowCollectionPoint } from '@modules/address/domain/models/IShowCollectionPoint';
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
    const showCollectionsPoints = collectionsPoints.map((col)=>{
      return {
        name: col.name,
        urlMap: col.urlMap,
        address: col.address,
      }
    })
    return showCollectionsPoints;    
  }
}
export default ShowAllCollectionPointsService;