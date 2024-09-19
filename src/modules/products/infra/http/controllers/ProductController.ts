import { IProduct } from '@modules/products/domain/models/IProduct';
import CreateProductService from '@modules/products/domain/services/CreateProductService';
import{Request, Response} from 'express'
import { container } from 'tsyringe';

class ProductController{
  public async createProduct(request: Request, response: Response): Promise<Response>{
    const {name, cetegory, description, stock, requirement } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({name, cetegory, description, stock, requirement});
    return response.status(201).json(product);
  }
}
export default ProductController;