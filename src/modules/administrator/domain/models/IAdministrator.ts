export interface IAdministrator{
  id: string | undefined;
  _id: any;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  isActive: boolean;
}