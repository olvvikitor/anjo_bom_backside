import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';

export interface IProductRepository{
  getByName(name: string): Promise<IProduct | null>;
  getProducts(): Promise<IProduct[]>;
  getProductById(id: string): Promise<IProduct>;
  createProduct(product: ICreateProduct): Promise<IProduct>;
  updateProduct(id: string, product: IProduct): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}