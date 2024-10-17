import CreateEventoService from '@modules/eventos/services/CreateEventoService';
import DeleteEventoService from '@modules/eventos/services/DeleteEventoService';
import ShowAllEventosService from '@modules/eventos/services/ShowAllEventosService';
import { IPaginate } from '@shared/domain/paginate/IPaginate';
import{Request, Response} from 'express'
import { isValidObjectId } from 'mongoose';
import { container } from 'tsyringe';


export default class EventoController{
    public async getEvents(request:Request, response:Response) :Promise<Response>{
    const showAllEventosService = container.resolve(ShowAllEventosService)
    const { page, limit} = request.query;
      const options:IPaginate = {
        page: parseInt(page as string, 10),
        limit: parseInt(limit as string, 10) 
      }
     
    
    
    const eventos = await showAllEventosService.execute(options);
    console.log(eventos.length)
    
    return response.status(200).json(eventos);
  }
  public async createEvento(request:Request, response:Response): Promise<Response>{

    const createEventoService = container.resolve(CreateEventoService);

    const {titulo, descricao, address, data_inicio, data_fim} = request.body;

    const adressJson = JSON.parse(address)

    const files =  request.files as Express.Multer.File[]; // Tipagem explícita para request.files

    const photos =  files?.map((file: Express.Multer.File) => file.filename); // Tipagem explícita para o parâmetro file

    const evento = await createEventoService.execute({titulo, descricao, photos , address: adressJson, data_inicio, data_fim});   
    return response.status(201).json(evento);                
  }
  public async deleteEvento(request: Request, response: Response):Promise<Response>{

    const id = request.params.id;

    if (!isValidObjectId(id)) {
      return response.status(400).json({ error: 'Invalid ObjectId' });
    }
    
    const deleteEventService = container.resolve(DeleteEventoService);
    const dletedEvent =  await deleteEventService.execute({id});
    return response.status(200).json(dletedEvent);
  }

}