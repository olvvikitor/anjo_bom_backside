import { inject, injectable } from 'tsyringe';
import { IEventoRepository } from '../domain/repositories/IEventoRepository';
import { IPhotoRepository } from '../domain/repositories/IPhotoRepository';
import { ICacheService } from '@shared/domain/models/ICacheService';
import { IAddress } from '@modules/address/domain/models/IAddress';
import IStorageService from '@shared/domain/models/IStorageService';
import AppError from '@shared/errors/AppError';
import { IEvento } from '../domain/models/IEvento';
import { IUpdateEvento } from '../domain/models/IUpdateEvento';
import { IPhotoEvent } from '../domain/models/IPhotoEvent';

interface IRequest {
  titulo: string;
  descricao: string;
  fotos_remove: string[];
  fotos_adicionadas: string[];
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
  ) {
    this.cacheService = cacheService;
    this.eventoRepository = eventoRepository;
    this.photoRepository = photoRepository
  }
  public async execute(id: string, evento: IRequest): Promise<IEvento> {
    const eventoExists = await this.eventoRepository.findById(id);

    if (!eventoExists) {
      throw new AppError('Evento não encontrado', 404)
    }

    //APAGANDO FOTOS DO STORAGE
    const photos = await this.photoRepository.findAllPhotosByEventId(eventoExists._id)

    if (photos.length < 1) throw new AppError('nenhuma foto existente', 404)

    if (evento.fotos_remove[0] != '') {
      //removendo fotos selecionadas
      await Promise.all(evento.fotos_remove.map(async (key, index) => {
        const splitArray = key.split(',')
        await this.storageService.deleteFile(splitArray[index].split('/')[3])
      }))
    }
    //adicionando novas fotos
    await Promise.all(evento.fotos_adicionadas.map(async (foto) => {
        const newPhoto = await this.photoRepository.createPhotoEvent({
          url: foto,
          event_id: eventoExists._id
        } as IPhotoEvent)
        await this.storageService.saveFile(foto)
        eventoExists.photos.push(newPhoto._id)
      })
    )


    const event = await this.eventoRepository.update(id, {
      address: evento.address,
      data_fim: evento.data_fim,
      data_inicio: evento.data_inicio,
      descricao: evento.descricao,
      titulo: evento.titulo
    } as IUpdateEvento)

    await this.cacheService.invalidate('api_anjobom_EVENTS_LIST')

    return event as IEvento;
  }

}