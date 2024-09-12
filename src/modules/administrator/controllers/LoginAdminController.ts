import { Request, Response } from 'express';
import LoginAdministratorService from '../services/LoginAdministratorService';


class LoginAdministratorController{
  public async loginAdmin(request: Request, response: Response): Promise<Response> {
    const { email , password} = request.body;
    const loginService = new LoginAdministratorService();
    const admin = await loginService.execute({ email, password});
    return response.status(200).json(admin);
  }
}
export default LoginAdministratorController;