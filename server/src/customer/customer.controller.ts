import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/createCustomer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/')
  async create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Get('/getId')
  async getId() {
    return this.customerService.getId();
  }

  @Delete('/')
  async delete(@Query('id') id: number) {
    return this.customerService.delete(id);
  }

  @Get('/customers')
  async getCustomers() {
    return this.customerService.getCustomers();
  }

  @Get('/customersName')
  async getCustomersName() {
    return this.customerService.getCustomersName();
  }

  @Get('/byId')
  async getById(@Query('id') id: number) {
    return this.customerService.getCustomerById(id);
  }

  @Put('/')
  async update(@Body() payload: CreateCustomerDto) {
    return this.customerService.update(payload);
  }
}
