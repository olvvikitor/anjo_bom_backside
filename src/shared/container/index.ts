import { IAdministratorRepository } from '@modules/administrator/domain/repositories/IAdministratorRepository';
import AdministratorRepository from '@modules/administrator/infra/mongoose/repositories/AdministratorRepository';
import { IDonateWithPixRepository } from '@modules/donates/domain/repositories/IDonateWithPixRepository';
import DonateWithPixRepository from '@modules/donates/infra/mongoose/repositories/DonateRepository';
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import PersonRepository from '@modules/donor/infra/mongoose/repository/PersonRepository';
import { IEventoRepository } from '@modules/eventos/domain/repositories/IEventoRepository';
import { IPhotoRepository } from '@modules/eventos/domain/repositories/IPhotoRepository';
import EventoRepository from '@modules/eventos/infra/mongoose/repositories/EventoRepository';
import PhotoRepository from '@modules/eventos/infra/mongoose/repositories/PhotoRepository';
import { IPayment } from '@shared/domain/models/IPaymentService';
import { ISmsService } from '@shared/domain/models/ISmsService';
import { MercadoPagoService } from '@shared/infra/services/MercadoPagoService';
import { TwilloSmsService } from '@shared/infra/services/TwilloSmsService';

import {container} from 'tsyringe';

container.register<IAdministratorRepository>('IAdministratorRepository', AdministratorRepository);
container.register<IDonateWithPixRepository>('IDonateWithPixRepository', DonateWithPixRepository);
container.register<IPersonRepository>('IPersonRepository', PersonRepository);
container.register<IEventoRepository>('IEventoRepository', EventoRepository);
container.register<IPhotoRepository>('IPhotoRepository', PhotoRepository);
container.register<IPayment>('IPaymentService',MercadoPagoService);
container.register<ISmsService>('ISmsService', TwilloSmsService);