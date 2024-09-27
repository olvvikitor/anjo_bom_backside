import { Requirement } from './enums/Requirement';

export interface IProduct{
  _id: any;
  name: string;
  requirement: Requirement;
}