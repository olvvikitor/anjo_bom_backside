import { ICollectionPoint } from '../models/ICollectionPoints';
import { ICreateCollectionPoint } from '../models/ICreateCollectionPoint';

export default interface ICollectionPointRepository {
  getCollectionPointByName(name: string): Promise<ICollectionPoint | null >;
  getAllCollectionPoints(): Promise<ICollectionPoint[] | null>; // Assuming any[] is the return type for the repository method
  getCollectionPointById(id: any): Promise<ICollectionPoint | null>; // Assuming any | null is the return type for the repository method
  createCollectionPoint(point: ICreateCollectionPoint): Promise<ICollectionPoint>; // Assuming any is the return type for the repository method
  updateCollectionPoint(id: any, point: ICollectionPoint): Promise<void>; // Assuming void is the return type for the repository method
  deleteCollectionPoint(id: any): Promise<void>; // Assuming void is the return type for the repository method
}