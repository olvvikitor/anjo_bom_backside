import{Request, Response} from 'express'
import CreateEventoService from '../services/CreateEventoService'
import ShowAllEventosService from '../services/ShowAllEventosService';

export default class EventoController{

    public async getEvents(request:Request, response:Response) :Promise<Response>{
    const showAllEventosService = new ShowAllEventosService;
    const eventos = await showAllEventosService.execute();
    return response.status(200).json(eventos);
  }

}