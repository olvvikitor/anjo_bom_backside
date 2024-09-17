import { Model } from 'mongoose';
import Evento, { IEvento } from '../entities/Evento';
import { paginate } from 'mongoose-paginate-v2';


class EventoRepository {

  private model: Model<IEvento>

  constructor() {
    this.model = Evento;
  }

  
  async createEvent(event: IEvento): Promise<IEvento> {
    const newEvent = await this.model.create(event);
    await newEvent.save();
    return newEvent;
  }
  async uploadEvent(event: IEvento): Promise<IEvento> {
    await this.model.updateOne({_id: event._id}, event);
    return event;
  }
  async showAll():Promise<IEvento[]> {
    const events = await this.model.find();
    return events;
  }
  async delete(id:string):Promise<void>{
    await this.model.deleteOne({_id: id});
  }
  async findById(id: string): Promise<IEvento | null>{
    const event = await this.model.findOne({_id:id});
    return event;
  }
}
export default EventoRepository;