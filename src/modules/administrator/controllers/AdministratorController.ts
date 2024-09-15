import { Request, Response } from 'express';
import CreateAdministratorService from '../services/CreateAdministratorService';
import ShowAllAdmin from '../services/ShowAllAdmin';
import UpdtateStatusAdmin from '../services/UpdateStatusAdmin';
import GetAllDonorService from '../services/GetAllDonorService';
import FindAllDonatesApproved from '@modules/donates/services/FindAllDonatesApproved';
import DeleteEventoService from '@modules/eventos/services/DeleteEventoService';
import CreateEventoService from '@modules/eventos/services/CreateEventoService';


class AdministratorController{
  public async revogueAdmin(request:Request, response:Response):Promise<Response> {
    const updtateStatusAdmin = new UpdtateStatusAdmin();
    const id = request.params.id;
    await updtateStatusAdmin.execute({id});
    return response.status(200).json();
  }

  public async showAll(request: Request, response:Response):Promise<Response>{ 
    const showAllAdminService = new ShowAllAdmin;
    const admins = await showAllAdminService.showAll();
    return response.status(200).json(admins);

  }
  public async createAdministrator(request: Request, response: Response): Promise<Response> {
    const {name, email, password} = request.body;
    const createAdminService = new CreateAdministratorService;
    const admin = await createAdminService.execute({name, email, password});
    return response.status(200).json(admin);
  }
  public async getAllDonors(request: Request, response: Response): Promise<Response>{
    const getAllDonorsService = new GetAllDonorService;
    const donors = await getAllDonorsService.showAll();
    return response.status(200).json(donors);
  }
  public async findAllDonatesApproved(request: Request, response: Response):Promise<Response>{
    const findAllDonatesApproved = new FindAllDonatesApproved();
    const donations = await findAllDonatesApproved.execute();
    return response.status(200).json(donations);
  }
  public async deleteEvento(request: Request, response: Response):Promise<Response>{
    const id = request.params.id;
    const deleteEventService = new DeleteEventoService();
    const dletedEvent =  await deleteEventService.execute({id});
    return response.status(200).json(dletedEvent);
  }
  public async createEvento(request:Request, response:Response): Promise<Response>{

    const createEventoService = new CreateEventoService();

    const {titulo, descricao, address, data_inicio, data_fim} = request.body;

    const adressJson = JSON.parse(address)

    const files =  request.files as Express.Multer.File[]; // Tipagem explícita para request.files
    const photos =  files?.map((file: Express.Multer.File) => file.filename); // Tipagem explícita para o parâmetro file

    const evento = await createEventoService.execute({titulo, descricao, photos , address: adressJson, data_inicio, data_fim});   
    return response.status(201).json(evento);                
  }

}
export default AdministratorController;
