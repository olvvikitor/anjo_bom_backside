import { IEvento } from '@modules/eventos/domain/models/IEvento';
import { Model, PaginateResult } from 'mongoose';

import Evento from '../entities/Evento';
import { IEventoRepository } from '@modules/eventos/domain/repositories/IEventoRepository';
import { IPaginate } from '@shared/domain/paginate/IPaginate';


class EventoRepository implements IEventoRepository {

  private model: Model<IEvento>

  constructor() {
    this.model = Evento;
  }
  showAllPaginate(options?: IPaginate): Promise<IEvento[]> {
    throw new Error('Method not implemented.');
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
    const events = await this.model.find()
    return events
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