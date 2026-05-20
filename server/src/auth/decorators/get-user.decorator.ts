import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Custom decorator to extract user info from request object after JwtAuthGuard
export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);
