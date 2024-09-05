import Address from '@modules/address/entities/Address';
import { Schema, model, Document, Types } from 'mongoose';

export interface IDonor extends Document<Types.ObjectId> {
  name: string;
  last_name: string;
  email: string;
  password: string;
  motivation: string;
  isActive: boolean;
  address: {
    type: Schema.Types.ObjectId
  }
}

const donorSchema = new Schema<IDonor>({
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
  address:{
    type: Schema.Types.ObjectId,
    ref: 'Address'  // Referencia ao endereço
  }
});


const Donor = model<IDonor>('Donor', donorSchema);

export default Donor;
