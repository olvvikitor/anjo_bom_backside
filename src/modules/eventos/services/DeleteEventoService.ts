import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import upload from '@config/upload';
import IStorageService from '@shared/domain/models/IStorageService';
import { ICacheService } from '@shared/domain/models/ICacheService';

interface IRequest {
  id: string;
}

@injectable()
class DeleteEventoService {
  private eventoRepository: IEventoRepository;
  private photoRepository: IPhotoRepository;
  private storageService: IStorageService;
  private cacheService: ICacheService
  constructor(
    @inject('IEventoRepository')
    eventoRepository: IEventoRepository,
    @inject('IPhotoRepository')
    photoRepository: IPhotoRepository,
    @inject('ICacheService')
    cacheSercvice: ICacheService,
    @inject('IStorageService')
    storageService: IStorageService
  ) {
    this.eventoRepository = eventoRepository;
    this.photoRepository = photoRepository;
    this.storageService = storageService;
    this.cacheService = cacheSercvice
  }

  public async execute({ id }: IRequest): Promise<void> {
    const event = await this.eventoRepository.findById(id);

    if (!event) {
      throw new AppError('Evento não encontrado', 404);
    }
    if (event.photos != null) {
      const photoEvents: any[] = event.photos;

      const deletar = await Promise.all(photoEvents.map(photos => this.photoRepository.findById(photos)))

      Promise.all(deletar.map(photo => {
        if (photo) this.storageService.deleteFile(photo.url)

      }))
      await this.eventoRepository.delete(id);
    }
    await this.cacheService.invalidate('api_anjobom_EVENTS_LIST')
    await this.eventoRepository.delete(id);
    
  }
}


export default DeleteEventoService;