import { IAddress } from '@modules/address/domain/models/IAddress';

export interface ICreateCollectionPoint{
  name: string;
  address: IAddress;
  urlMap: string;
}