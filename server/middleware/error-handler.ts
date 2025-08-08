import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../core/errors';
import { logger } from '../core/logger';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Error handling request:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method
  });

  if (err instanceof ZodError) {
    return res.status(400).json({
      status: 'error',
      code: 'VALIDATION_ERROR',
      message: 'Invalid request data',
      details: err.errors
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      status: 'error',
      code: err.code,
      message: err.message,
      details: err.details
    });
  }

  // Default error
  res.status(500).json({
    status: 'error',
    code: 'INTERNAL_SERVER_ERROR',
    message: 'An unexpected error occurred'
  });
}