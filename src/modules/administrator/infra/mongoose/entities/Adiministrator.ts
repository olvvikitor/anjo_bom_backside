import { IAdministrator } from '@modules/administrator/domain/models/IAdministrator';
import { model, Schema, Types, Document } from 'mongoose';




const schemaAdministrator = new Schema<IAdministrator>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    selected: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
})
//salvando no mongoose
const Administrator = model<IAdministrator>('Administrator', schemaAdministrator);

export default Administrator;