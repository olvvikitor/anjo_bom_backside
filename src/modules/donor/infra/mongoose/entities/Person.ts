import { AddressSchema } from '@modules/address/infra/mongoose/entities/Address';
import { IPerson } from '@modules/donor/domain/models/IPerson';
import { Schema, model } from 'mongoose';

const personSchema = new Schema<IPerson>({
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
    
  },
  motivation: { 
    type: String 
  },
  isActive: { 
    type: Boolean,
    default: true,
  },
  address:{
    type: AddressSchema,
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

const Person = model<IPerson>('Person', personSchema);

export default Person;
