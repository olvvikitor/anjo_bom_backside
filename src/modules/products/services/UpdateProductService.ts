import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { Requirement } from '../domain/models/enums/Requirement';
import { IProductRepository } from '../domain/repositories/IproductRepository';

interface IRequest{
  id:string;
  requirement:Requirement;
}
@injectable()
class UpdateProductService{
  private productRepository: IProductRepository;
  constructor (
    @inject('IProductRepository') 
    productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }
  public async execute({id,requirement}:IRequest): Promise<void>{

    const product = await this.productRepository.getProductById(id);

    if(!product){
      throw new AppError('Product not exists', 404);
    }
    // Valida se existe um enumerado igual ao que foi enviado pela request
    const requirementExists = Object.keys(Requirement).includes(requirement)
    console.log(requirementExists)
    if(!requirementExists){
      throw new AppError('Invalid requirement', 400);
    }

    product.requirement = requirement as Requirement;

    await this.productRepository.updateProduct(id, product);
  }
}
export default UpdateProductService;