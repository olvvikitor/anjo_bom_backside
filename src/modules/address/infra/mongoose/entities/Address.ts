import { IAddress } from '@modules/address/domain/models/IAddress';
import { Schema } from 'mongoose';

export const AddressSchema = new Schema<IAddress>({
  cep: {
    type: String,
    required: false,
  },
  estado: {
    type: String,
    required: true,
    maxlength: 2,
  },
  cidade: {
    type: String,
    required: true,
    maxlength: 100,
  },
  bairro: {
    type: String,
    required: true,
    maxlength: 100,
  },
  rua: {
    type: String,
    required: true,
    maxlength: 100,
  },
  numero: {
    type: String,
    required: true,
  },
});
