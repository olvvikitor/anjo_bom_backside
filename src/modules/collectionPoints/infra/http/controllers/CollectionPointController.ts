import { IAddress } from '@modules/address/domain/models/IAddress';
import CreateCollectionPointService from '@modules/collectionPoints/services/CreateCollectionPointService';
import DeleteCollectionService from '@modules/collectionPoints/services/DeleteCollectionService';
import ShowAllCollectionPointsService from '@modules/collectionPoints/services/ShowAllCollectionPointsService';
import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { isValidObjectId } from 'mongoose';
import { UpdateCollectionPointsService } from '@modules/collectionPoints/services/UpdateCollectionPointsService';


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
  public async deleteCollectionPoints(request: Request, response: Response): Promise<Response> {
    const id : string  = request.params.id;

    if(!isValidObjectId(id)){
      return response.status(400).json({message: 'Id inválido'})
    }
    const deleteColectionPointService = container.resolve(DeleteCollectionService);
    await deleteColectionPointService.execute(id)
    
    return response.status(200).json()
  }
  public async updateCollectionPoint(request: Request, response: Response):Promise<Response>{
    const updateService = container.resolve(UpdateCollectionPointsService);
    const { name, urlMap,address } = request.body
    const id = request.params.id
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
    await updateService.execute(id, collectionPointData)
    return response.status(204).json({message: 'Produto atualizado com sucesso!'})
  }
}