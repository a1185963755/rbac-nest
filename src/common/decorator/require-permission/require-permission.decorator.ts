import { SetMetadata } from '@nestjs/common';

export const RequirePermission = (...args: string[]) =>
  SetMetadata('require-permission', args);
