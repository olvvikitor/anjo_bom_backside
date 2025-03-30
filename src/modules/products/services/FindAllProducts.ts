import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IproductRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export class FindAllProductsService{
  constructor(
    @inject('IProductRepository')
    private productRepository : IProductRepository
  ){}
  public async  execute() : Promise<IProduct[]>{
    return await this.productRepository.getProducts();
  }
}