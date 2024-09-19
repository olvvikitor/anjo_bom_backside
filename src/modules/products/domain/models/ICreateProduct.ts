import { Requirement } from './enums/Requirement';

export interface ICreateProduct{
  name: string;
  description: string;
  stock: number;
  cetegory: any; 
  requirement: Requirement;
}