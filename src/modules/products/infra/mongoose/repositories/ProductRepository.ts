import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductRepository } from '@modules/products/domain/repositories/IproductRepository';
import { Model } from 'mongoose';
import Product from '../entities/Product';

class ProductRepository implements IProductRepository{
  private model: Model<IProduct>;
  constructor(){
    this.model = Product;
  }
  async getByName(name: string): Promise<IProduct|null> {
    const product = await this.model.findOne({name: name});
    return product;
  }
  async getProducts(): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  async getProductById(id: string): Promise<IProduct> {
    throw new Error('Method not implemented.');
  }
  async createProduct(product: IProduct): Promise<IProduct> {
    const createdProduct = await this.model.create(product);
    await createdProduct.save();
    return createdProduct;
  }
  async  updateProduct(id: string, product: IProduct): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async deleteProduct(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
export default ProductRepository;