import { IPerson } from "../models/IPerson";

export interface IPersonRepository {
  create(person: IPerson): Promise<IPerson>;
  findAll(options: object): Promise<IPerson[]>;
  update(id: string, updateData: Partial<IPerson>): Promise<void>;
  delete(id: any): Promise<void>;
  findByEmailOrPhone(param: string): Promise<IPerson | null>;
}
