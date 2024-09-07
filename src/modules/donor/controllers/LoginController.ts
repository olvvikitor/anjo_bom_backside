import{Request, Response} from 'express'
import LoginService from '../services/LoginService';

class LoginController{

  public async login(request: Request, response: Response): Promise<Response> {
    const{param, password} = request.body
    const loginService = new LoginService;
    const token = await loginService.execute({param, password});
    return response.status(200).json(token);
  }
}
export default LoginController;