import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserDecorator {
  id: string;
  username: string;
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
