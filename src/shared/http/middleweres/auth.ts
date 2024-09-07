
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export const SECRET_KEY: Secret = process.env.APP_SECRET as string;


export interface CustomRequest{
 iat:number;
 exp: number;
 sub: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new AppError("Usuario não autenticado/Sessão expirada", 401);
   }

   const decoded = jwt.verify(token, SECRET_KEY);
   const {sub} = decoded as CustomRequest
   req.Person = {
     id: sub,
   };
   next();
 } catch (err) {
   throw new AppError("Token inválido", 401);
 }
};
