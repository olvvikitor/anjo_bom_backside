import ShowAllEventosService from '@modules/eventos/services/ShowAllEventosService';
import{Request, Response} from 'express'
import { container } from 'tsyringe';


export default class EventoController{
    public async getEvents(request:Request, response:Response) :Promise<Response>{
    const showAllEventosService = container.resolve(ShowAllEventosService)
    const eventos = await showAllEventosService.execute();
    return response.status(200).json(eventos);
  }

}