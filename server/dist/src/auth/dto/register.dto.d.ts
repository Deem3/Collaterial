import { ROLE } from '@prisma/client';
export declare class RegisterDto {
    username: string;
    password: string;
    role?: ROLE;
}
