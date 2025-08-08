import { Request, Response, NextFunction } from 'express';
import { AuthenticationError } from '../core/errors';

declare module 'express' {
  interface Request {
    userId?: string;
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session?.userId;

  if (!userId) {
    throw new AuthenticationError();
  }

  req.userId = userId;
  next();
}

export function optionalAuth(req: Request, res: Response, next: NextFunction) {
  const userId = req.session?.userId;
  if (userId) {
    req.userId = userId;
  }
  next();
}