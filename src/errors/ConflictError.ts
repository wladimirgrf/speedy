import { ConflictException } from '@nestjs/common';

export class ConflictError extends Error {
  static httpError(message: string) {
    throw new ConflictException(message);
  }
}
