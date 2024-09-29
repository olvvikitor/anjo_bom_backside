import { IPhotoEvent } from '@modules/eventos/domain/models/IPhotoEvent';
import { Schema, model, Document, Types } from 'mongoose';


export const photoEventSchema = new Schema<IPhotoEvent>({
  url: {
    type: String,
    required: true,
  },
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
  },
})
const PhotoEvent = model<IPhotoEvent>('PhotoEvent', photoEventSchema);
export default PhotoEvent;