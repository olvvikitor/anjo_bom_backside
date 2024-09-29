import { inject, injectable } from 'tsyringe';
import { IProduct } from '../models/IProduct';
import { IProductRepository } from '../repositories/IproductRepository';
import AppError from '@shared/errors/AppError';
import { ICreateProduct } from '../models/ICreateProduct';
import { Requirement } from '../models/enums/Requirement';

@injectable()
class CreateProductService{
  private productRepository: IProductRepository;
  constructor (
    @inject('IProductRepository') 
    productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }
  public async execute({name, requirement}: ICreateProduct): Promise<IProduct>{
    const product = await this.productRepository.getByName(name);

    // Valida se existe um enumerado igual ao que foi enviado pela request
    const requirementExists = Object.keys(Requirement).includes(requirement)
    
    if(!requirementExists){
      throw new AppError('Invalid requirement', 400);
    }
    if(product){
      throw new AppError('Product already exists', 409);
    }

    const createProduct = await this.productRepository.createProduct({name, requirement}as ICreateProduct);
    return createProduct

  }
}
export default CreateProductService;