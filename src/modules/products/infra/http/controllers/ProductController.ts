
import CreateProductService from '@modules/products/services/CreateProductService';
import { FindAllProductsService } from '@modules/products/services/FindAllProducts';
import UpdateProductService from '@modules/products/services/UpdateProductService';
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
  public async findAll(request: Request, response:Response):Promise<Response>{

    const findAllProductsServices = container.resolve(FindAllProductsService);
    const products = await findAllProductsServices.execute();
    return response.status(200).json(products)
  }
}
export default ProductController;