import { Model } from 'mongoose';
import Person from '../entities/Person';
import {IPerson as IPersonModel} from '../entities/Person';


class PersonRepository {

  private model: Model<IPersonModel>;

  constructor() {
    this.model = Person;
  }

  async create(person:IPersonModel): Promise<IPersonModel> {
     const persons = await this.model.create(person);
     await persons.save();
     return persons;
  }

  // async findById(phone: string): Promise<IPersonModel | null> {
  //   const person = await this.model.findOne({
  //     _id:id
  //   }).select('+code');
  //   return person;
  // }

  async findAll(): Promise<IPersonModel[]> {
    const person = await this.model.find().exec();
    return person
  }

  async update(id: string, updateData: Partial<IPersonModel>): Promise<void> {
    await this.model.updateOne({_id: id}, updateData);

  }

  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id).exec();
  }
  async findByEmailOrPhone(param: string): Promise<IPersonModel | null> {
    const person = await this.model.findOne({ email: param }).select('+code');
    if(!person) {
      const personPhone  = await this.model.findOne({phone: param}).select('+code');
      return personPhone;
    }
    return person;
  }
}

export default PersonRepository;
