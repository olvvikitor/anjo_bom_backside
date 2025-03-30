import { IAddress } from '@modules/address/domain/models/IAddress';


export interface IUpdateEvento{
  titulo:string;
  descricao:string;
  photos: any[];
  address: IAddress
  data_inicio: Date;
  data_fim: Date;
}