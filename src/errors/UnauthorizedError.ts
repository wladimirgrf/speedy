import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedError extends Error {
  static httpError(message: string) {
    throw new UnauthorizedException(message);
  }
}
