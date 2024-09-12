import{Request, Response} from 'express'
import LoginService from '../services/Login/GenerateCode';
import CheckCodeService from '../services/Login/CheckCodeService';

class LoginController{

  public async login(request: Request, response: Response): Promise<Response> {
    const{param} = request.body
    const loginService = new LoginService;
    const person = await loginService.execute({param});
    return response.status(200).json(person);
  }
  public async checkCode(request: Request, response:Response): Promise<Response>{
    const{code} = request.body
    const id = request.params.id
    const checkCodeService = new CheckCodeService;
    const result = await checkCodeService.execute(code, id);
    return response.status(200).json(result);
  }
}
export default LoginController;