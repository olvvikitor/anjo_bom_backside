import { Model } from 'mongoose';
import PhotoEvent, { IPhotoEvent } from '../entities/Photo';


class PhotoRepository {
  private model: Model<IPhotoEvent>

  constructor() {
    this.model = PhotoEvent;;
  }
  
  async createPhotoEvent(photo: IPhotoEvent): Promise<IPhotoEvent> {
    const newEvent = await this.model.create(photo);
    await newEvent.save();
    return newEvent;
  }
}
export default PhotoRepository;