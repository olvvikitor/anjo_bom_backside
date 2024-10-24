import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export const SECRET_KEY: Secret = process.env.APP_SECRET as string;

export class JWTTokenService {
  generateToken(payload: object, subject: string): string {
    //utiliza para testes com jest pois o jest n acessa variaveis de ambiente
    if(SECRET_KEY === undefined){
      return jwt.sign(payload, 'minhaChaveSecreta', {
        expiresIn: '30d',
        subject,
      });
    }
    else{
      return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '30d',
        subject,
      });
    }
    
  }

  verifyToken(token: string): string | JwtPayload {
    try {
      return jwt.verify(token, SECRET_KEY);
    } catch {
      throw new AppError('Token inválido', 403);
    }
  }
}