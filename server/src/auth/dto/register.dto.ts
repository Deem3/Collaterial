import { ROLE } from '@prisma/client';
import { IsEnum, IsNotEmpty, Length, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  public username: string;
  @IsNotEmpty()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter',
  })
  public password: string;
  @IsEnum([ROLE.MANAGER, ROLE.EMPLOYEE])
  public role?: ROLE;
}
