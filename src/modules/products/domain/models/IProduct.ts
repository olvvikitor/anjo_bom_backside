import { Requirement } from './enums/Requirement';

export interface IProduct{
  _id: any;
  name: string;
  description: string;
  stock: number;
  cetegory: any; 
  requirement: Requirement;
}