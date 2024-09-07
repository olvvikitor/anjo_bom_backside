import { Schema, model, Document, Types } from "mongoose";

export interface IAddressPerson extends Document {
  cep?: string;
  estado: string;
  cidade: string;
  bairro: string;
  rua: string;
  numero: string;
}

export const AddressPersonSchema = new Schema<IAddressPerson>({
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
const AddressPerson = model<IAddressPerson>('AddressPerson', AddressPersonSchema);

export default AddressPerson;
