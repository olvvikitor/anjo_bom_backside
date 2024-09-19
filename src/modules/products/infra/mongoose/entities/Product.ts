import { IProduct } from '@modules/products/domain/models/IProduct';
import { model, Schema } from 'mongoose';
import {Requirement} from '../../../domain/models/enums/Requirement';
export const productSchemma = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
    default: 0,
  },
  cetegory: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
  requirement:{
    type: Number,
    default: Requirement.MEDIO,
  }
})
const Product = model<IProduct>('Product', productSchemma);
export default Product;
  