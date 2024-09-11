import { IAddress } from '@modules/address/entities/Address';
import { IEvento } from '@modules/eventos/entities/Evento';
import EventoRepository from '../repositories/EventoRepository';
import PhotoRepository from '../repositories/PhotoRepository';
import { IPhotoEvent } from '../entities/Photo';

interface IRequest {
  titulo: string;
  descricao: string;
  photos: string[]; // Arquivos de fotos enviados
  address: IAddress;
  data_inicio: Date;
  data_fim: Date;

}

class CreateEventoService {
  public async execute({
    titulo,
    descricao,
    photos,
    address,
    data_inicio,
    data_fim,
  }: IRequest): Promise<IEvento> {
    const eventoRepository = new EventoRepository();
    const photoRepository = new PhotoRepository();
    
    const evento = await eventoRepository.createEvent({
      titulo,
      descricao,
      address,
      data_inicio,
      data_fim,
    } as IEvento);

    // Salvar as fotos do evento
    const photosSave = await Promise.all(
      photos.map(p => photoRepository.createPhotoEvent({
        url: p,
        event_id: evento._id,
      } as IPhotoEvent)));


   
    evento.photos = photosSave.map(p => p._id);

    await eventoRepository.uploadEvent(evento); // Atualizando o evento com as fotos salvas
    
    return evento;
  }
}

export default CreateEventoService;
