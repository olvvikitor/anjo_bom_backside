export interface IHashProvider{
  generateHash(payload:string): Promise<string>;
  compareHash(payload:string, hashedPassword: string): Promise<boolean> 
}