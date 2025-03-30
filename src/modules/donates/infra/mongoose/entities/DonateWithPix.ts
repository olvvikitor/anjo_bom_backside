import { IDonateWithPix } from '@modules/donates/domain/models/IDonateWithPix';
import { Schema, model } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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
donatePixSchemma.plugin(paginate)
const DonateWithPix = model<IDonateWithPix>('DonateWithPix', donatePixSchemma);
export default DonateWithPix;