import { IAddress } from '@modules/address/entities/Address';
import { IEvento } from '../domain/models/IEvento';
import { IPhotoEvent } from '../domain/models/IPhotoEvent';
import EventoRepository from '../infra/mongoose/repositories/EventoRepository';
import PhotoRepository from '../infra/mongoose/repositories/PhotoRepository';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  titulo: string;
  descricao: string;
  photos: string[]; // Arquivos de fotos enviados
  address: IAddress;
  data_inicio: Date;
  data_fim: Date;
}
@injectable()
class CreateEventoService {
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

  public async execute({
    titulo,
    descricao,
    photos,
    address,
    data_inicio,
    data_fim,
  }: IRequest): Promise<IEvento> {
    
    const evento = await this.eventoRepository.createEvent({
      titulo,
      descricao,
      address,
      data_inicio,
      data_fim,
    } as IEvento);

    // Salvar as fotos do evento
    const photosSave = await Promise.all(
      photos.map(p => this.photoRepository.createPhotoEvent({
        url: p,
        event_id: evento._id,
      } as IPhotoEvent)));


   
    evento.photos = photosSave.map(p => p._id);

    await this.eventoRepository.uploadEvent(evento); // Atualizando o evento com as fotos salvas
    
    return evento;
  }
}

export default CreateEventoService;
