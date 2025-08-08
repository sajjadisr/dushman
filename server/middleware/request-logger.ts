import { Request, Response, NextFunction } from 'express';
import { logger } from '../core/logger';

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, path, body, query } = req;

  // Log request
  logger.info(`Incoming ${method} ${path}`, {
    query,
    body: method !== 'GET' ? body : undefined
  });

  // Capture response
  const originalJson = res.json;
  res.json = function(data) {
    const duration = Date.now() - start;
    
    logger.info(`${method} ${path} completed`, {
      duration: `${duration}ms`,
      status: res.statusCode,
      response: process.env.NODE_ENV === 'development' ? data : undefined
    });

    return originalJson.call(this, data);
  };

  next();
}