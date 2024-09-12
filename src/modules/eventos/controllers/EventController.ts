import{Request, Response} from 'express'
import CreateEventoService from '../services/CreateEventoService'
import ShowAllEventosService from '../services/ShowAllEventosService';

export default class EventoController{

  public async create(request:Request, response:Response): Promise<Response>{

    const createEventoService = new CreateEventoService();

    const {titulo, descricao, address, data_inicio, data_fim} = request.body;

    const adressJson = JSON.parse(address)

    const files =  request.files as Express.Multer.File[]; // Tipagem explícita para request.files
    const photos =  files?.map((file: Express.Multer.File) => file.filename); // Tipagem explícita para o parâmetro file


    const evento = await createEventoService.execute({titulo, descricao, photos , address: adressJson, data_inicio, data_fim});   
    return response.status(201).json(evento);                
  }
  public async getEvents(request:Request, response:Response) :Promise<Response>{
    const showAllEventosService = new ShowAllEventosService;
    const eventos = await showAllEventosService.execute();
    return response.status(200).json(eventos);
  }

}