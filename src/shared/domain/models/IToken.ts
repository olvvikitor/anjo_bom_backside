export interface IToken{
  generateToken(payload: object, subject: string) : string;
  verifyToken(token:string): object | null| string;
}