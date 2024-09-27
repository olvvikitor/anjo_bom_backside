import { Request, Response } from 'express';
import FindAllDonatesApproved from '@modules/donates/services/FindAllDonatesApproved';
import DeleteEventoService from '@modules/eventos/services/DeleteEventoService';
import CreateEventoService from '@modules/eventos/services/CreateEventoService';
import CreateAdministratorService from '@modules/administrator/services/CreateAdministratorService';
import GetAllDonorService from '@modules/administrator/services/GetAllDonorService';
import ShowAllAdmin from '@modules/administrator/services/ShowAllAdmin';
import UpdtateStatusAdmin from '@modules/administrator/services/UpdateStatusAdmin';
import { container } from 'tsyringe';
import UpdateStatusWhitPix from '@modules/donates/services/UpdatePixDonateService';
import { IPaginate } from '@shared/domain/paginate/IPaginate';


class AdministratorController {
  public async revogueAdmin(request: Request, response: Response): Promise<Response> {
    const updtateStatusAdmin = container.resolve(UpdtateStatusAdmin)
    const id = request.params.id;
    await updtateStatusAdmin.execute({ id });
    return response.status(200).json();
  }

  public async showAll(request: Request, response: Response): Promise<Response> {
    const showAllAdminService = container.resolve(ShowAllAdmin)
    const admins = await showAllAdminService.showAll();
    return response.status(200).json(admins);

  }
  public async createAdministrator(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createAdminService = container.resolve(CreateAdministratorService)

    const admin = await createAdminService.execute({ name, email, password });

    return response.status(200).json(admin);
  }
  public async getAllDonors(request: Request, response: Response): Promise<Response> {
    const getAllDonorsService = container.resolve(GetAllDonorService);
    const donors = await getAllDonorsService.showAll();
    return response.status(200).json(donors);
  }
  public async findAllDonatesApproved(request: Request, response: Response): Promise<Response> {

     const { page, perPage} = request.query;
    
      const options:IPaginate = {
        page: parseInt(page as string, 10),
        limit: parseInt(perPage as string, 10) 
      }
    
  
    const updateStatusWhitPix = container.resolve(UpdateStatusWhitPix)

    await updateStatusWhitPix.execute();

    const findAllDonatesApproved = container.resolve(FindAllDonatesApproved);
    const donations = await findAllDonatesApproved.execute(options);
    return response.status(200).json(donations);
    
  }


}
export default AdministratorController;
