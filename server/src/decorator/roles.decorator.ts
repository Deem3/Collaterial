import { SetMetadata } from '@nestjs/common';
import { ROLE } from 'prisma/prisma-client';

export const ROLES_KEY: string = 'roles';
export const Roles = (...roles: ROLE[]) => SetMetadata(ROLES_KEY, roles);
