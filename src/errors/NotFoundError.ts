import { NotFoundException } from '@nestjs/common';

export class NotFoundError extends Error {
  static httpError(message: string) {
    throw new NotFoundException(message);
  }
}
