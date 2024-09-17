import AppError from '@shared/errors/AppError';
import EventoRepository from '../repositories/EventoRepository';

interface IRequest{
  id: string;
}

class DeleteEventoService {
  public async execute({id}: IRequest): Promise<void> {
    const eventoRepository = new EventoRepository();

    const event = await eventoRepository.findById(id);
    
    if(!event){
 
      throw new AppError('Evento não encontrado', 404);
    }

    await eventoRepository.delete(id);
  }

} export default DeleteEventoService;