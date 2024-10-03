import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import { IPhotoEvent } from '../domain/models/IPhotoEvent';

interface IRequest{
  id: string;
}

@injectable()
class DeleteEventoService {
  private eventoRepository: IEventoRepository;
  private photoRepository: IPhotoRepository;
  constructor(
    @inject('IEventoRepository')
    eventoRepository: IEventoRepository,
    @inject('IPhotoRepository')
    photoRepository: IPhotoRepository,
  ) {
    this.eventoRepository = eventoRepository;
    this.photoRepository = photoRepository;
  }
  
  public async execute({id}: IRequest): Promise<void> {
    const storageProvider = new DiskStorageProvider();
    const event = await this.eventoRepository.findById(id);
    
    if(!event){
      throw new AppError('Evento não encontrado', 404);
    }
     const photoEvents: any[] = event.photos;
     
     const deletar = await Promise.all(photoEvents.map(photos => this.photoRepository.findById(photos)))

       Promise.all(deletar.map(photo =>{
        if(photo) storageProvider.deleteFile(photo.url)
      }))
     
     await this.eventoRepository.delete(id);
  }
}

export default DeleteEventoService;