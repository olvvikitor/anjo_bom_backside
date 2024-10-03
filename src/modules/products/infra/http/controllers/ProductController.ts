import CreateProductService from '@modules/products/domain/services/CreateProductService';
import UpdateProductService from '@modules/products/domain/services/UpdateProductService';
import{Request, Response} from 'express'
import { isValidObjectId } from 'mongoose';
import { container } from 'tsyringe';

class ProductController{
  public async createProduct(request: Request, response: Response): Promise<Response>{
    const {name, requirement } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({name, requirement});
    return response.status(201).json(product);
  }
  public async updateProduct(request: Request, response:Response):Promise<Response>{
    const id = request.params.id;

    if (!isValidObjectId(id)) {
      return response.status(400).json({ error: 'Invalid ObjectId' });
    }

    const requirement = request.body.requirement;
    const updateProductService = container.resolve(UpdateProductService);
    await updateProductService.execute({id, requirement});
    return response.status(200).json();
  }
}
export default ProductController;