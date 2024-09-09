import { Schema, model, Document, Types } from 'mongoose';
import { IPhotoEvent, photoEventSchema } from './Photo';
import { IAddress } from '@modules/address/entities/Address';

export interface IEvento extends Document<Types.ObjectId>{
  titulo:string;
  descricao:string;
  photos: IPhotoEvent[];
  address: IAddress
  data_inicio: Date;
  data_fim: Date;
  created_at: Date;
  updated_at: Date;
}
const eventoSchemma = new Schema<IEvento>({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  address:{
    type: Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  photos: {
    type: [photoEventSchema],
    required: false,
  },
  data_inicio: {
    type: Date,
    required: true,
  },
  data_fim: {
    type: Date,
    
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
});