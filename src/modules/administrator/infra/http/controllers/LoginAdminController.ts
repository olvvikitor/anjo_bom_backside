import LoginAdministratorService from '@modules/administrator/services/LoginAdministratorService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';



class LoginAdministratorController{
  public async loginAdmin(request: Request, response: Response): Promise<Response> {
    const { email , password} = request.body;
    const loginService = container.resolve(LoginAdministratorService)
    const admin = await loginService.execute({ email, password});
    return response.status(200).json(admin);
  }
}
export default LoginAdministratorController;