

import { Schema, model, Document, Types } from 'mongoose';


export interface IDonateWithPix extends Document{
  name: string
  id_pix: number;
  status: string;
  amount: number;
  message: string;
  email: string;
  phone: string;

}
export const donatePixSchemma = new Schema<IDonateWithPix>({
  name:{
    type: String,
    
  },
  id_pix: {
    type: Number,
    
  },
  status: {
    type: String,
    
  },
  amount: {
    type: Number,
    
  },
  message: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  phone: {
    type: String,
    
  },
 
})
const DonateWithPix = model<IDonateWithPix>('DonateWithPix', donatePixSchemma);
export default DonateWithPix;