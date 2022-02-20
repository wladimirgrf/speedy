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
    const handler = (error: any) => {
      const appError = AcceptedErrors[error.constructor.name];

      if (appError && appError.httpError instanceof Function) {
        appError.httpError(error.message);
      }

      throw error;
    };

    return next.handle().pipe(catchError((error) => handler(error)));
  }
}
