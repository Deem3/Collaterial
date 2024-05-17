import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { generateId } from 'src/utils/generateId';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async create(payload: CreateCustomerDto) {
    const customer = await this.prisma.customer.create({
      data: {
        id: payload.customerId,
        firstname: payload.firstname.toLowerCase(),
        email: payload.email.toLowerCase(),
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
        gender: payload.gender,
        birthdate: payload.birthdate,
        khoroo: payload.khoroo,
        surname: payload.surname.toLocaleLowerCase(),
        district: payload.district,
        lastname: payload.lastname.toLocaleLowerCase(),
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

  async delete(id: number) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    await this.prisma.customer.delete({
      where: {
        id,
      },
    });
  }

  async getId() {
    let id;
    let customerExists = true;

    while (customerExists) {
      id = generateId();
      const customer = await this.prisma.customer.findUnique({
        where: { id },
      });
      if (!customer) {
        customerExists = false;
      }
    }

    return id;
  }

  async getCustomers() {
    return await this.prisma.customer.findMany();
  }

  async getCustomersName() {
    const customers = await this.prisma.customer.findMany({
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    return customers.map((customer) => ({
      ...customer,
      id: customer.id.toString(),
    }));
  }

  async getCustomerById(id: number) {
    return await this.prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }

  async update(payload: CreateCustomerDto) {
    const customer = await this.prisma.customer.findUnique({
      where: {
        id: payload.customerId,
      },
    });

    if (!customer) throw new NotFoundException('Customer not found');

    return await this.prisma.customer.update({
      where: {
        id: payload.customerId,
      },
      data: {
        firstname: payload.firstname.toLowerCase(),
        email: payload.email.toLowerCase(),
        phone: payload.phone,
        address: payload.address,
        city: payload.city,
        gender: payload.gender,
        birthdate: payload.birthdate,
        khoroo: payload.khoroo,
        surname: payload.surname.toLocaleLowerCase(),
        district: payload.district,
        lastname: payload.lastname.toLocaleLowerCase(),
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
  }
}
