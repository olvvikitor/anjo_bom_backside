import { IAddress } from '@modules/address/domain/models/IAddress'

export interface IShowCollectionPoint{
  id: any;
  name: string;
  urlMap:string
  address: IAddress;
}