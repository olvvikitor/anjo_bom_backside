import { IAdministratorRepository } from '@modules/administrator/domain/repositories/IAdministratorRepository';
import AdministratorRepository from '@modules/administrator/infra/mongoose/repositories/AdministratorRepository';
import { ICollectionPoint } from '@modules/collectionPoints/domain/models/ICollectionPoints';
import ICollectionPointRepository from '@modules/collectionPoints/domain/repositories/ICollectionPointRepository';
import ICollectionPointsRepository from '@modules/collectionPoints/domain/repositories/ICollectionPointRepository';
import CollectionPointRepository from '@modules/collectionPoints/infra/mongoose/repositories/CollectionPointRepository';
import { IDonateWithPixRepository } from '@modules/donates/domain/repositories/IDonateWithPixRepository';
import DonateWithPixRepository from '@modules/donates/infra/mongoose/repositories/DonateRepository';
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';
import PersonRepository from '@modules/donor/infra/mongoose/repository/PersonRepository';
import { IEventoRepository } from '@modules/eventos/domain/repositories/IEventoRepository';
import { IPhotoRepository } from '@modules/eventos/domain/repositories/IPhotoRepository';
import EventoRepository from '@modules/eventos/infra/mongoose/repositories/EventoRepository';
import PhotoRepository from '@modules/eventos/infra/mongoose/repositories/PhotoRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IproductRepository';
import ProductRepository from '@modules/products/infra/mongoose/repositories/ProductRepository';
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
container.register<IProductRepository>('IProductRepository', ProductRepository);
container.register<ICollectionPointRepository>('ICollectionPointRepository', CollectionPointRepository);

container.register<IPayment>('IPaymentService', MercadoPagoService);
container.register<ISmsService>('ISmsService', TwilloSmsService);