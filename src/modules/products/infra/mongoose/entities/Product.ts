import { Requirement } from '@modules/products/domain/models/enums/Requirement';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { model, Schema } from 'mongoose';
export const productSchemma = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  requirement:{
    type: String,
    enum: Object.values(Requirement),
    default: Requirement.MEDIO,
  }
})
const Product = model<IProduct>('Product', productSchemma);
export default Product;
  