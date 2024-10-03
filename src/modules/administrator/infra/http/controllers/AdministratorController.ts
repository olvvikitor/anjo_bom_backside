import { Request, Response } from 'express';
import CreateAdministratorService from '@modules/administrator/services/CreateAdministratorService';
import ShowAllAdmin from '@modules/administrator/services/ShowAllAdmin';
import UpdtateStatusAdmin from '@modules/administrator/services/UpdateStatusAdmin';
import { container } from 'tsyringe';
import { isValidObjectId } from 'mongoose';


class AdministratorController {
  public async revogueAdmin(request: Request, response: Response): Promise<Response> {
    const updtateStatusAdmin = container.resolve(UpdtateStatusAdmin)
    const id = request.params.id;

    if(!isValidObjectId(id)){
      return response.status(400).json({message: 'Id inválido'})
    }
    
    await updtateStatusAdmin.execute({ id });
    return response.status(200).json();
  }

  public async showAll(request: Request, response: Response): Promise<Response> {
    const showAllAdminService = container.resolve(ShowAllAdmin)
    const admins = await showAllAdminService.showAll();
    return response.status(200).json(admins);

  }
  public async createAdministrator(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdminService = container.resolve(CreateAdministratorService)

    const admin = await createAdminService.execute({ name, email, password });

    return response.status(200).json(admin);
  }

}
export default AdministratorController;
