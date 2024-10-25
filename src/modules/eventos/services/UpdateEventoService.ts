import { inject, injectable } from 'tsyringe';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import { ICacheService } from '@shared/domain/models/ICacheService';
import { IAddress } from '@modules/address/domain/models/IAddress';
import IStorageService from '@shared/domain/models/IStorageService';
import AppError from '@shared/errors/AppError';
import { IEvento } from '../domain/models/IEvento';
import { IUpdateEvento } from '../domain/models/IUpdateEvento';

interface IRequest {
  titulo: string;
  descricao: string;
  photos: string[];
  address: IAddress;
  data_inicio: Date;
  data_fim: Date;
}

@injectable()
export class UpdateEventoService {
  constructor(
    @inject('IEventoRepository')
    private eventoRepository: IEventoRepository,
    @inject('IPhotoRepository')
    private photoRepository: IPhotoRepository,
    @inject('ICacheService')
    private cacheService: ICacheService,
    @inject('IStorageService')
    private storageService: IStorageService
  ) {}

  public async execute(id: string, evento: IRequest): Promise<IEvento> {
    const eventoExists = await this.eventoRepository.findById(id);
    if (!eventoExists) {
      throw new AppError('Evento não encontrado', 404);
    }

    const photos = await this.photoRepository.findAllPhotosByEventId(eventoExists._id);
    if (photos.length < 1) throw new AppError('nenhuma foto existente', 404);

    // APAGANDO FOTOS DO STORAGE e atualizando URLs
    await Promise.all(photos.map(async (photo) => {
      await this.storageService.deleteFile(photo.url);
      photo.url = evento.photos.shift() as string; // Atualiza com a nova foto
      if (photo.url) {
        await this.storageService.saveFile(photo.url);
      }
      await this.photoRepository.update(photo._id, photo);
    }));

    const updatedEvent = await this.eventoRepository.update(id, {
      address: evento.address,
      data_fim: evento.data_fim,
      data_inicio: evento.data_inicio,
      descricao: evento.descricao,
      titulo: evento.titulo
    } as IUpdateEvento);

    await this.cacheService.invalidate('api_anjobom_EVENTS_LIST');
    return updatedEvent as IEvento;
  }
}
