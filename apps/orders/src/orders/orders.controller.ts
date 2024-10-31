import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity'

@Controller()
export class OrdersController {
  private readonly logger = new Logger(OrdersController.name);

  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern('orders.createOrder')
  async create(@Payload() orderData: Partial<Order>) {
    this.logger.log('Received request to create a new order');
    return this.ordersService.create(orderData);
  }

  @MessagePattern('orders.findAllOrders')
  // findAll(@Payload() page: number = 1,@Payload() pageSize: number = 10) {
  findAll(){
    this.logger.log('Listing orders - Page: , Page Size:');
    // return this.ordersService.findAll(Number(page), Number(pageSize));
    return 'return all api2'
  }

  @MessagePattern('orders.findOneOrder')
  findOne(@Payload() id: number) {
    this.logger.log(`Received request to fetch order with ID: ${id}`);
    return this.ordersService.findOne(id);
  }

  @MessagePattern('orders.updateOrder')
  update(@Payload() id: number,@Payload() status: string) {
    this.logger.log(`Received request to fetch order with ID: ${id}`);
    return this.ordersService.updateStatus(id, status);
  }

}
