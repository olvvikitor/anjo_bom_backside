import { inject, injectable } from 'tsyringe';
import { IProduct } from '../models/IProduct';
import { IProductRepository } from '../repositories/IproductRepository';
import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../models/ICreateProduct';

@injectable()
class CreateProductService{
  private productRepository: IProductRepository;
  constructor (
    @inject('IProductRepository') 
    productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }
  public async execute({name, cetegory, description, stock, requirement}: ICreateProduct): Promise<IProduct>{
    const product = await this.productRepository.getByName(name);

    if(product){
      throw new AppError('Product already exists', 409);
    }
    const createProduct = await this.productRepository.createProduct({name, cetegory, description, stock, requirement}as ICreateProduct);
    return createProduct

  }
}
export default CreateProductService;