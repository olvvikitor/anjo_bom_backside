import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';

export const SECRET_KEY: Secret = process.env.APP_SECRET as string;

export class JWTTokenService {
  generateToken(payload: object, subject: string): string {
    //utilizar para teste
    if(SECRET_KEY === undefined){
      return jwt.sign(payload, 'minhaChaveSecreta', {
        expiresIn: '8h',
        subject,
      });
    }
    else{
      return jwt.sign(payload, SECRET_KEY, {
        expiresIn: '8h',
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