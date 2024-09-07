import AddressPerson, {IAddressPerson, AddressPersonSchema} from '@modules/address/entities/AddressPerson';
import { Schema, model, Document, Types } from 'mongoose';

export interface IPerson extends Document<Types.ObjectId> {
  name: string;
  last_name: string;
  email: string;
  phone:string;
  password: string;
  motivation: string;
  isActive: boolean;
  addressPerson: IAddressPerson;
  created_at: Date;
  updated_at: Date;
}

const PersonSchema = new Schema<IPerson>({
  name: { 
    type: String,
    required: true 
  },
  last_name: { 
    type: String,
    required: true 
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone:{
    type: String,
    required: true,
    unique: true,
    select: true,  // Exibe o número de telefone no response
  },
  password:{
    type: String,
    required: true,
    minlength: 6,
    select: false  // Não exibe a senha no response
  },
  motivation: { 
    type: String 
  },
  isActive: { 
    type: Boolean,
    default: true,
  },
  addressPerson:{
    type: AddressPersonSchema,
    required: true,  
  },
  created_at:{
    type: Date,
    default: Date.now,
    select: false,  // Não exibe a data de criação do Person no response
  },
  updated_at:{
    type: Date,
    default: Date.now,
    select: false,  // Não exibe a data de atualização do Person no response
  }
});

const Person = model<IPerson>('Person', PersonSchema);

export default Person;
