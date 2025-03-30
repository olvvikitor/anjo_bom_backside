import { IItemsDonates } from './IItemsDonates';

export interface ICesta{
  _id?: any;
  items: IItemsDonates[];
  person_id: any;
  status: 'COLETADO' | 'PENDENTE';
  created_at: Date;
  updated_at: Date;
}