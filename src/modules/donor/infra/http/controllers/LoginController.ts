import CheckCodeService from '@modules/donor/services/Login/CheckCodeService';
import LoginService from '@modules/donor/services/Login/GenerateCode';
import{Request, Response} from 'express'
import { container } from 'tsyringe';


class LoginController{

  public async login(request: Request, response: Response): Promise<Response> {
    const{param} = request.body
    const loginService = container.resolve(LoginService)
    const person = await loginService.execute({param});
    return response.status(200).json(person);
  }
  public async checkCode(request: Request, response:Response): Promise<Response>{
    const{code} = request.body
    const id = request.params.id
    const checkCodeService =container.resolve(CheckCodeService)
    const result = await checkCodeService.execute(code, id);
    return response.status(200).json(result);
  }
}
export default LoginController;