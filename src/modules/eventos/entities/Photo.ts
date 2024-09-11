import { Schema, model, Document, Types } from 'mongoose';

export interface IPhotoEvent extends Document<Types.ObjectId>{
  url: string;
  event_id: Types.ObjectId;
}

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