import { model, Schema, Types, Document } from 'mongoose';

// definido os tipos de entrada para o objeto adminstrador
export interface IAdministrator extends Document<Types.ObjectId>{
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  isActive: boolean;
}
//criando um schema/documento no mongoose com o objeto acima 
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
    minlength: 5,
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

//exportando para ser usado em outros lugares do código
export default Administrator;