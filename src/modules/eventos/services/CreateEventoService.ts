import { IEvento } from '../domain/models/IEvento';
import { IPhotoEvent } from '../domain/models/IPhotoEvent';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import { inject, injectable } from 'tsyringe';
import { IAddress } from '@modules/address/domain/models/IAddress';
import { ICacheService } from '@shared/domain/models/ICacheService';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import upload from '@config/upload';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import IStorageService from '@shared/domain/models/IStorageService';

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
  private cacheService:ICacheService
  private storageService: IStorageService;
  constructor(
    @inject('IEventoRepository')
    eventoRepository : IEventoRepository, 
    @inject('IPhotoRepository')
    photoRepository : IPhotoRepository,
    @inject('ICacheService')
    cacheService:ICacheService,
    @inject('IStorageService')
    storageService:IStorageService
  ) {

    this.eventoRepository = eventoRepository
    this.photoRepository = photoRepository;
    this.cacheService = cacheService
    this.storageService = storageService
  }

  public async execute({
    titulo,
    descricao,
    photos,
    address,
    data_inicio,
    data_fim,
  }: IRequest): Promise<IEvento> {
  
    const storageProvider = new DiskStorageProvider();
    const s3Storage = new S3StorageProvider()

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

      //salvando foto no servidor configurado, atualmente s3 
      await Promise.all(photosSave.map(e=>{
      this.storageService.saveFile(e.url)
      }))

    evento.photos = photosSave.map(p => p._id);

    await this.eventoRepository.uploadEvent(evento); // Atualizando o evento com as fotos salvas
    
    //apagando do cache apos a criação
    await this.cacheService.invalidate('api_anjobom_EVENTS_LIST');
    return evento;
  }
}

export default CreateEventoService;
