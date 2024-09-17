import { IPerson } from "../models/IPerson";

export interface IPersonRepository {
  create(person: IPerson): Promise<IPerson>;
  findAll(): Promise<IPerson[]>;
  update(id: string, updateData: Partial<IPerson>): Promise<void>;
  delete(id: string): Promise<void>;
  findByEmailOrPhone(param: string): Promise<IPerson | null>;
}
