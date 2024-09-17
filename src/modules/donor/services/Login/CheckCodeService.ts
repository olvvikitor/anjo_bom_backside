
import AppError from "@shared/errors/AppError";
import { SECRET_KEY } from "@shared/infra/http/middleweres/auth";
import jwt from "jsonwebtoken";
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import { inject, injectable } from 'tsyringe';
interface IResponse {
  token: string;
}
@injectable()
class CheckCodeService {
  private personRepository: IPersonRepository;
  constructor(@inject('IPersonRepository')
    personRepository: IPersonRepository) {
    this.personRepository = personRepository;
  }
  //RECEBE UM CODIGO E UM PARAMETRO(PHONE) PARA FAZER A BUSCA DO ULTIMO CODIGO GERADO
  public async execute(code: string, param: string): Promise<IResponse> {
    
    
    const person = await this.personRepository.findByEmailOrPhone(param);
   

    if (!person) {
      throw new AppError("No Person found", 404);
    }

    if (person.code != code) {
      throw new AppError("Invalid code", 401);
    }

    const token = jwt.sign({ name: person.name, id: person.email }, SECRET_KEY, {
      expiresIn: "2 days",
      subject: person.email,
    });
    
    return { token };
  }
}
export default CheckCodeService;
