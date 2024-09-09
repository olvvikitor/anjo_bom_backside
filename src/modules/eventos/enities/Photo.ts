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
    type: Schema.ObjectId,
    required: true,
    ref: 'Event',
  },
})
const Photo = model<IPhotoEvent>('PhotoEvent', photoEventSchema);
export default Photo;