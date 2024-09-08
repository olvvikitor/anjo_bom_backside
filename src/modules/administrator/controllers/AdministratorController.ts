import { Request, Response } from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import CreateAdministratorService from '../services/CreateAdministratorService';


@controller('/admin')
class AdministratorController{
  @httpPost('/')
  public async createAdministrator(@request() request: Request, @response() response: Response): Promise<Response> {
    const {name, email, password} = request.body;
    const createAdminService = new CreateAdministratorService();
    const admin = await createAdminService.execute({name, email, password});
    return response.status(200).json(admin);
  }
}
export default AdministratorController;
