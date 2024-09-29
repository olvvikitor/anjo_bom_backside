import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import { IAddress } from '@modules/address/domain/models/IAddress';
import { IPaginate } from '@shared/domain/paginate/IPaginate';

interface IResponse {
  titulo: string;
  descricao: string;
  photos: string[];
  address: IAddress;
  data_inicio: Date;
  data_fim: Date;
}

@injectable()
class ShowAllEventosService {
  private eventoRepository : IEventoRepository;
  private photoRepository : IPhotoRepository;
  
  constructor(
    @inject('IEventoRepository')
    eventoRepository : IEventoRepository, 
    @inject('IPhotoRepository')
    photoRepository : IPhotoRepository) {

    this.eventoRepository = eventoRepository
    this.photoRepository = photoRepository;
  }
  public async execute(options: IPaginate): Promise<IResponse[]> {

    // Buscar todos os eventos
    const events = await this.eventoRepository.showAll(options);
    if (!events) {
      throw new AppError('Eventos não encontrados', 404);
    }

    // Buscar fotos associadas a cada evento
    const photoPromises = events.map(event => this.photoRepository.findAllPhotosByEventId(event._id));
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
