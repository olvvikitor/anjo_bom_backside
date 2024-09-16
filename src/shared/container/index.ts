import { IAdministratorRepository } from '@modules/administrator/domain/repositories/IAdministratorRepository';
import AdministratorRepository from '@modules/administrator/infra/mongoose/repositories/AdministratorRepository';
import {container} from 'tsyringe';

container.register<IAdministratorRepository>('IAdministratorRepository', AdministratorRepository);