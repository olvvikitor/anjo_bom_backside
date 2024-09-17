import AppError from '@shared/errors/AppError';
import { IEvento } from '../entities/Evento';
import EventoRepository from '../repositories/EventoRepository';
import PhotoRepository from '../repositories/PhotoRepository';
import { IAddress } from '@modules/address/entities/Address';

interface IResponse {
  titulo: string;
  descricao: string;
  photos: string[];
  address: IAddress;
  data_inicio: Date;
  data_fim: Date;
}

class ShowAllEventosService {
  public async execute(): Promise<IResponse[]> {
    const eventoRepository = new EventoRepository();
    const photoRepository = new PhotoRepository();

    // Buscar todos os eventos
    const events = await eventoRepository.showAll();
    if (!events) {
      throw new AppError('Eventos não encontrados', 404);
    }

    // Buscar fotos associadas a cada evento
    const photoPromises = events.map(event => photoRepository.findAllPhotosByEventId(event._id));
    const photosResults = await Promise.all(photoPromises);

    // Adicionar fotos aos eventos e formatar a resposta
    const eventsWithPhotos: IResponse[] = events.map((event, index) => {
      const photos = photosResults[index].map(photo => photo.url);

      return {
        titulo: event.titulo,
        descricao: event.descricao,
        photos,
        address: event.address, 
        data_inicio: event.data_inicio,
        data_fim: event.data_fim
      };
    });

    return eventsWithPhotos;
  }
}

export default ShowAllEventosService;
