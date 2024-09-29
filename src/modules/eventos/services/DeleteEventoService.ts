import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';


interface IRequest{
  id: string;
}

@injectable()
class DeleteEventoService {
  private eventoRepository: IEventoRepository;
  constructor(
    @inject('IEventoRepository')
    eventoRepository: IEventoRepository) {

    this.eventoRepository = eventoRepository;
  }
  public async execute({id}: IRequest): Promise<void> {

    const event = await this.eventoRepository.findById(id);
    
    if(!event){
 
      throw new AppError('Evento não encontrado', 404);
    }

    await this.eventoRepository.delete(id);
  }

} export default DeleteEventoService;