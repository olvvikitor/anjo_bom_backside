import { Schema, model, Document, Types } from 'mongoose';
import { AddressSchema, IAddress } from '@modules/address/entities/Address';

export interface IEvento extends Document<Types.ObjectId>{
  titulo:string;
  descricao:string;
  photos: Types.ObjectId[];
  address: IAddress
  data_inicio: Date;
  data_fim: Date;
  created_at: Date;
  updated_at: Date;
}
export const eventoSchemma = new Schema<IEvento>({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  address:{
    type: AddressSchema,
    ref: 'Address',
    required: true,
  },
  photos: {
    type: [Schema.Types.ObjectId],
    ref: 'PhotoEvent',
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
    select: false,// Não exibe a data de criação do Evento no response
  },
  updated_at: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});
const Event = model<IEvento>('Event', eventoSchemma);
export default  Event;