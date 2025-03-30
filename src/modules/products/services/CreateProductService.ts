import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { Requirement } from '../domain/models/enums/Requirement';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProduct } from '../domain/models/IProduct';
import { IProductRepository } from '../domain/repositories/IproductRepository';

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