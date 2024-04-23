import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer.dto';
import { CustomerService } from './customer.service';

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

  @Get('/customers')
  async getCustomers() {
    return this.customerService.getCustomers();
  }
}
