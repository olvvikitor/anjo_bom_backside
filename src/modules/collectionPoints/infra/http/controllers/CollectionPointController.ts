import { IAddress } from '@modules/address/domain/models/IAddress';
import CreateCollectionPointService from '@modules/collectionPoints/services/CreateCollectionPointService';
import DeleteCollectionService from '@modules/collectionPoints/services/DeleteCollectionService';
import ShowAllCollectionPointsService from '@modules/collectionPoints/services/ShowAllCollectionPointsService';
import { Request, Response } from 'express'
import { container } from 'tsyringe';


export default class CollectionPointController {
  public async createCollectionPoint(request: Request, response: Response): Promise<Response> {
    const createCollectionPointService = container.resolve(CreateCollectionPointService);
    const { name, urlMap,address } = request.body
    const { cep, estado, cidade, bairro, rua, numero, } = address;
    const collectionPointData = {
      name,
      urlMap,
      address: {
        cep,
        estado,
        cidade,
        bairro,
        rua,
        numero,
      } as IAddress
    }
    const collectionPoint = await createCollectionPointService.execute(collectionPointData);
    return response.status(200).json(collectionPoint);
  }
  public async getAllCollectionPoints(request: Request, response: Response): Promise<Response> {
    const showAllCollectionPointsService = container.resolve(ShowAllCollectionPointsService);
    const collectionPoints = await showAllCollectionPointsService.execute();
    return response.status(200).json(collectionPoints);
  }
  public async deleteCollectionPoints(request: Request, response: Response): Promise<void> {
    const id : string  = request.params.id;
    const deleteColectionPointService = container.resolve(DeleteCollectionService);
    await deleteColectionPointService.execute(id)
    response.status(200).json()
  }
}