import PersonRepository from "@modules/donor/repository/PersonRepository";
import AppError from "@shared/errors/AppError";
import { SECRET_KEY } from "@shared/http/middleweres/auth";
import jwt from "jsonwebtoken";
import compare from 'bcryptjs'
interface IResponse {
  token: string;
}
class CheckCodeService {

  //RECEBE UM CODIGO E UM PARAMETRO(PHONE) PARA FAZER A BUSCA DO ULTIMO CODIGO GERADO
  public async execute(code: string, param: string): Promise<IResponse> {
    
    const personRepository = new PersonRepository();
    
    const person = await personRepository.findByEmailOrPhone(param);
   

    if (!person) {
      throw new AppError("No Person found", 404);
    }

    if (person.code != code) {
      throw new AppError("Invalid code", 401);
    }

    const token = jwt.sign({ name: person.name, id: person._id }, SECRET_KEY, {
      expiresIn: "2 days",
      subject: person.id,
    });
    
    return { token };
  }
}
export default CheckCodeService;
