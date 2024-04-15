import { ROLE } from 'prisma/prisma-client';
export declare const ROLES_KEY: string;
export declare const Roles: (...roles: ROLE[]) => import("@nestjs/common").CustomDecorator<string>;
