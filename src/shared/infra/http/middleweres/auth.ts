import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { JWTTokenService } from '@shared/infra/services/JWTService';

export const SECRET_KEY: Secret = process.env.APP_SECRET as string;


// Middleware de autenticação
export const auth = (jwtService: JWTTokenService) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const authHeader = request.headers.authorization?.replace('Bearer', '');
      
      if (!authHeader) {
        throw new AppError('Usuário não autenticado/Sessão expirada', 401);
      }
      const decoded = jwtService.verifyToken(authHeader);
      const {sub} = decoded

      request.Admin = {
        id: sub as string, 
      }
      next();
      
    } catch (err) {
      next(new AppError('Token inválido', 401));
    }
  };
};
