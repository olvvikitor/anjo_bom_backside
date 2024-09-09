import { Schema, model, Document, Types } from "mongoose";

export interface IAddress extends Document {
  cep?: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}

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
const Address = model<IAddress>('Address', AddressSchema);

export default Address;
