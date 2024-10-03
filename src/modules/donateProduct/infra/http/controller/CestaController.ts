import CreateCestaService from '@modules/donateProduct/services/CreateCestaService';
import {Request, Response } from 'express'
import { isValidObjectId } from 'mongoose';
import { container } from 'tsyringe';
export class CestaController {
  public async createCesta(request: Request, response: Response): Promise<Response> {
    const {items} = request.body;   
    const person_id = request.params.person_id;

    if(!isValidObjectId(person_id)){
      return response.status(400).json({message: 'Id inválido'})
    }
    
    const createCestaService = container.resolve(CreateCestaService)
    const res = await createCestaService.execute({items, person_id: person_id})
    return response.status(200).json(res)
  
}
}