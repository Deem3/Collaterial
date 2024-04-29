import { IsEmail, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  customerId: bigint;
  @IsNotEmpty()
  surname: string;
  @IsNotEmpty()
  firstname: string;
  @IsNotEmpty()
  lastname: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  birthdate: Date;
  @IsNotEmpty()
  civilRegistrationNumber: string;
  @IsNotEmpty()
  register: string;
  @IsNotEmpty()
  marriageStatus: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  familyMembers: number;
  @IsNotEmpty()
  education: string;
  @IsNotEmpty()
  employment: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  district: string;
  @IsNotEmpty()
  khoroo: string;
  @IsNotEmpty()
  address: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  monthlyIncome: bigint;
  @IsNotEmpty()
  phone: {
    first: number;
    last: number;
  };
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  userId: string;
}
