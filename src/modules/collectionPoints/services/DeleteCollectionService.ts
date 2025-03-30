import { inject, injectable } from 'tsyringe'
import ICollectionPointRepository from '../domain/repositories/ICollectionPointRepository'
import AppError from '@shared/errors/AppError'

@injectable()
class DeleteCollectionService{
  private collectionPointsRepository: ICollectionPointRepository
  constructor(
    @inject('ICollectionPointRepository')
    collectionPointsRepository: ICollectionPointRepository){
    this.collectionPointsRepository = collectionPointsRepository
  }
  public async execute(id: string):Promise<void>{
    const collectionPoints = await this.collectionPointsRepository.getCollectionPointById(id)
    if(!collectionPoints){
      throw new AppError('Collection Point not found', 404)
    }
    await this.collectionPointsRepository.deleteCollectionPoint(id)
    console.log('deletado')
  }
}
export default DeleteCollectionService