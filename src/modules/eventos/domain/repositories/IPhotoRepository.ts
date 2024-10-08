import { IPhotoEvent } from '../models/IPhotoEvent'

export interface IPhotoRepository{
   createPhotoEvent(photo: IPhotoEvent): Promise<IPhotoEvent>
   findAllPhotosByEventId(eventId: any): Promise<IPhotoEvent[]>
}