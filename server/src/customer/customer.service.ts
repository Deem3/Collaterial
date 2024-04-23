import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCustomerDto) {
    const customer = await this.prisma.customer.create({
      data: {
        id: payload.customerId,
        firstname: payload.firstname,
        email: payload.email,
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
        gender: payload.gender,
        birthdate: payload.birthdate,
        khoroo: payload.khoroo,
        surname: payload.surname,
        district: payload.district,
        lastname: payload.lastname,
        register: payload.register,
        education: payload.education,
        employment: payload.employment,
        familyMembers: payload.familyMembers,
        createdBy: payload.userId,
        marriageStatus: payload.marriageStatus,
        monthlyIncome: payload.monthlyIncome,
        civilRegistrationNumber: payload.civilRegistrationNumber,
      },
    });
    return customer.id;
  }

  async getId() {
    return uuidv4();
  }

  async getCustomers() {
    const customers = await this.prisma.customer.findMany();
    return customers;
  }
}
