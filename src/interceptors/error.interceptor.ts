import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

import * as AcceptedErrors from '../errors';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError((error) => this.handler(error)));
  }

  handler(error: any): Observable<any> {
    const acceptedError = AcceptedErrors[error.constructor.name];

    if (acceptedError && acceptedError.httpError instanceof Function) {
      acceptedError.httpError(error.message);
    }

    throw error;
  }
}
