import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import HandleError from './handleError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new HandleError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.secret);

    const { sub } = decoded as ITokenPayload;

    request.reseller = {
      id: sub,
    };

    return next();
  } catch {
    throw new HandleError('Invalid JWT token', 401);
  }
}
