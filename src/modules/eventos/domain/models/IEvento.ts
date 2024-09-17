import { IAddress } from '@modules/address/domain/models/IAddress';


export interface IEvento{
  _id: any;
  titulo:string;
  descricao:string;
  photos: any[];
  address: IAddress
  data_inicio: Date;
  data_fim: Date;
  created_at: Date;
  updated_at: Date;
}