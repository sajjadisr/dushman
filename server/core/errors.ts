export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string) {
    super(404, `${resource} not found`, 'RESOURCE_NOT_FOUND');
  }
}

export class ValidationError extends ApiError {
  constructor(details: any) {
    super(400, 'Validation error', 'VALIDATION_ERROR', details);
  }
}

export class AuthenticationError extends ApiError {
  constructor(message = 'Authentication required') {
    super(401, message, 'AUTHENTICATION_REQUIRED');
  }
}

export class AuthorizationError extends ApiError {
  constructor(message = 'Permission denied') {
    super(403, message, 'PERMISSION_DENIED');
  }
}

export class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message, 'RESOURCE_CONFLICT');
  }
}