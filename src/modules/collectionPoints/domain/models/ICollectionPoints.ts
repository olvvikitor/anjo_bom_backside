import { IAddress } from '@modules/address/domain/models/IAddress';

export interface ICollectionPoint{
  _id: any;
  name: string;
  address: IAddress;
  isActive: boolean;
  urlMap: string;
  created_at: Date;
  updated_at: Date;
}