import { Model, Types } from 'mongoose';

import { IPhotoRepository } from '@modules/eventos/domain/repositories/IPhotoRepository';
import { IPhotoEvent } from '@modules/eventos/domain/models/IPhotoEvent';
import PhotoEvent from '../entities/Photo';


class PhotoRepository implements IPhotoRepository {
  private model: Model<IPhotoEvent>

  constructor() {
    this.model = PhotoEvent;;
  }
  
  async createPhotoEvent(photo: IPhotoEvent): Promise<IPhotoEvent> {
    const newEvent = await this.model.create(photo);
    await newEvent.save();
    return newEvent;
  }
  async findAllPhotosByEventId(eventId: Types.ObjectId): Promise<IPhotoEvent[]>{
    const photos = await this.model.find({event_id: eventId});
    return photos;
  }
}
export default PhotoRepository;