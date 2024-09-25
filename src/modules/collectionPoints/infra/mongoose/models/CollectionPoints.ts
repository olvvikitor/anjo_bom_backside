import { AddressSchema } from '@modules/address/infra/mongoose/entities/Address';
import { ICollectionPoint } from '@modules/collectionPoints/domain/models/ICollectionPoints';
import { model, Schema } from 'mongoose';

const schemaCollectionPoint = new Schema<ICollectionPoint>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: AddressSchema,
    ref: 'Address',
    required: true,
  },
  isActive:{
    type: Boolean,
    default: true,
  },
  created_at:{
    type: Date,
    default: Date.now(),
    select: false,
  },
  updated_at:{
    type: Date,
    default: Date.now(),
    select: false,
  }
});
const CollectionPoint = model<ICollectionPoint>('CollectionPoint', schemaCollectionPoint)
export default CollectionPoint;