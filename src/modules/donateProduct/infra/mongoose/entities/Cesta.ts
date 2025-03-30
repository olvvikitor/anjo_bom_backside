import { ICesta } from '@modules/donateProduct/domain/models/ICesta';
import { model, Schema } from 'mongoose';

export const cestaShemma = new Schema<ICesta>({
  items: [
    {
      name: String,
      quantity: Number
    }
  ],
  person_id:
 {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  status: {
    type: String,
    enum: ['COLETADO', 'PENDENTE'],
    default: 'PENDENTE'
  },
  created_at: {
    type: Date,
    default: Date.now

  },
  updated_at: {
    type: Date,
    default: Date.now
  },
});
const Cesta = model<ICesta>('Cesta', cestaShemma)
export default Cesta;