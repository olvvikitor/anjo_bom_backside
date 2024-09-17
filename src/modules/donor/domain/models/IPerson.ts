import { IAddress } from '@modules/address/domain/models/IAddress';

export interface IPerson{
  _id:any;
  name: string;
  last_name: string;
  email: string;
  phone:string;
  code: string;
  motivation: string;
  isActive: boolean;
  address: IAddress;
  created_at: Date;
  updated_at: Date;
}