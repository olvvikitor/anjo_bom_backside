import { Request, Response } from 'express';
import CreateAdministratorService from '../services/CreateAdministratorService';

class AdministratorController{
  public async createAdministrator(request: Request, response: Response): Promise<Response> {
    const {name, email, password} = request.body;
    const createAdminService = new CreateAdministratorService();
    const admin = await createAdminService.execute({name, email, password});
    return response.status(200).json(admin);
  }
}
export default AdministratorController;