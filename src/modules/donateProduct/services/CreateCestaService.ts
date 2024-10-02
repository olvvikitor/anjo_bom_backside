import AppError from '@shared/errors/AppError';
import { IProductRepository } from '@modules/products/domain/repositories/IproductRepository';
import { inject, injectable } from 'tsyringe';
import { ICestaRepository } from '../domain/repositories/ICestaRepository';

type IRequest = {
  items:[{
    name: string,
    quantity: number
  }]
  person_id: string;
}
@injectable()
class CreateCestaService{
  private productRepository:IProductRepository;
  private cestaRepository:ICestaRepository;
  constructor(
    @inject('IProductRepository')
    productRepository: IProductRepository,
    @inject('ICestaRepository')
    cestaRepository: ICestaRepository
  ){
    this.productRepository = productRepository;
    this.cestaRepository = cestaRepository;
  }
  public async execute({items, person_id}: IRequest){

    let productsNotFound: string[] = []

      await Promise.all(items.map(item => this.productRepository.getByName(item.name).then(
      (product) => {
        if(!product){
          productsNotFound.push(item.name)
        }
      }
    )))


    
    if(productsNotFound.length > 0){
      throw new AppError(`Product(s) ${productsNotFound.join(', ')} not found`, 400);
    }
    
    const cesta = await this.cestaRepository.createCesta({items, person_id: person_id});
    
    return cesta;

  }
}
export default CreateCestaService