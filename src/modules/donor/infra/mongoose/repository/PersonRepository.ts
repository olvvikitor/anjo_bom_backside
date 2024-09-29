import { Model,Types } from 'mongoose';
import Person from '../entities/Person';
import { IPerson } from '@modules/donor/domain/models/IPerson';
import { IPersonRepository } from '@modules/donor/domain/repositories/IPersonRepository';



class PersonRepository implements IPersonRepository{

  private model: Model<IPerson>;

  constructor() {
    this.model = Person;
  }

  async create(person:IPerson): Promise<IPerson> {
     const persons = await this.model.create(person);
     await persons.save();
     return persons;
  }

  async findAll(): Promise<IPerson[]> {
    const person = await this.model.find().exec();
    return person
  }

  async update(id: string, updateData: Partial<IPerson>): Promise<void> {
    await this.model.updateOne({_id: id}, updateData);

  }

  async delete(id: Types.ObjectId): Promise<void> {
    await this.model.findByIdAndDelete({_id: id}).exec();
  }
  async findByEmailOrPhone(param: string): Promise<IPerson | null> {
    const person = await this.model.findOne({ email: param }).select('+code');
    if(!person) {
      const personPhone  = await this.model.findOne({phone: param}).select('+code');
      return personPhone;
    }
    return person;
  }
}

export default PersonRepository;
