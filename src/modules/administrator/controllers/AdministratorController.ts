import { Request, Response } from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import CreateAdministratorService from '../services/CreateAdministratorService';
import ShowAllAdmin from '../services/ShowAllAdmin';
import UpdtateStatusAdmin from '../services/UpdateStatusAdmin';
import GetAllDonorService from '../services/GetAllDonorService';


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
}
export default AdministratorController;
